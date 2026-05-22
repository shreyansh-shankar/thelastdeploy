// agent/cmd/sync.go
package cmd

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/orbstack/agent/internal/cache"
	"github.com/orbstack/agent/internal/config"
	"github.com/orbstack/agent/internal/queue"
)

type syncResponse struct {
	Challenges []challengeBundle `json:"challenges"`
}

type challengeBundle struct {
	ID   string `json:"id"`
	YAML string `json:"yaml"`
}

func runSync(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	orbstackDir := filepath.Dir(cfg.DeviceKeyPath) // ~/.orbstack

	// Step 1: drain the result queue if the API is reachable.
	// We do this before fetching challenges so a single sync handles both.
	apiReachable := drainQueue(cfg.APIBaseURL, orbstackDir)

	// Step 2: fetch challenges from the API (or fall back to local).
	fmt.Printf("Syncing challenges from %s...\n", cfg.APIBaseURL)

	if !apiReachable {
		fmt.Println("API unreachable — falling back to local challenge files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(cfg.APIBaseURL + "/challenges")
	if err != nil {
		fmt.Println("API unreachable — falling back to local challenge files...")
		return syncFromLocal(cfg.ChallengesDir)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("read response: %w", err)
	}

	// If response starts with '<' something else owns this port.
	if len(body) > 0 && body[0] == '<' {
		fmt.Printf("Port %s is taken by another service (got HTML, not our API).\n", cfg.APIBaseURL)
		fmt.Printf("Tip: edit ~/.orbstack/config.yaml to change api_base_url.\n\n")
		fmt.Println("Falling back to local challenge files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}

	var sr syncResponse
	if err := json.Unmarshal(body, &sr); err != nil {
		fmt.Println("API response not recognised — falling back to local challenge files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	if len(sr.Challenges) == 0 {
		fmt.Println("No challenges returned from API.")
		return nil
	}

	for _, bundle := range sr.Challenges {
		if err := cache.SaveRaw(cfg.ChallengesDir, bundle.ID, []byte(bundle.YAML)); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", bundle.ID, err)
			continue
		}
		fmt.Printf("  ✓ %s\n", bundle.ID)
	}

	fmt.Printf("\nSynced %d challenge(s) to %s\n", len(sr.Challenges), cfg.ChallengesDir)
	return nil
}

// drainQueue attempts to POST any queued results to the API.
// Returns true if the API is reachable (even if some POSTs fail), false if not.
func drainQueue(apiBaseURL, orbstackDir string) bool {
	entries, err := queue.LoadAll(orbstackDir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "warn: could not read queue: %v\n", err)
		return false
	}
	if len(entries) == 0 {
		// Nothing queued — just probe reachability with a HEAD request.
		client := &http.Client{Timeout: 3 * time.Second}
		resp, err := client.Get(apiBaseURL + "/health")
		if err != nil {
			return false
		}
		resp.Body.Close()
		// If we got HTML back, it's not our API.
		return resp.StatusCode < 500
	}

	fmt.Printf("Flushing %d queued result(s) to API...\n", len(entries))

	reachable := false
	for _, entry := range entries {
		if err := postQueuedEntry(apiBaseURL, entry); err != nil {
			fmt.Fprintf(os.Stderr, "  ✗ %s (queued %s ago): %v\n",
				entry.ChallengeID,
				time.Since(entry.QueuedAt).Round(time.Second),
				err,
			)
			// If first attempt already fails, stop trying — API is down.
			if !reachable {
				return false
			}
			continue
		}
		reachable = true
		// Delete from queue only after confirmed POST success.
		if err := queue.Delete(orbstackDir, entry.ChallengeID, entry.QueuedAt); err != nil {
			fmt.Fprintf(os.Stderr, "  warn: could not remove queue entry: %v\n", err)
		} else {
			fmt.Printf("  ✓ %s (queued %s ago) — synced\n",
				entry.ChallengeID,
				time.Since(entry.QueuedAt).Round(time.Second),
			)
		}
	}
	return reachable
}

func postQueuedEntry(apiBaseURL string, entry *queue.Entry) error {
	data, err := json.MarshalIndent(entry, "", "  ")
	if err != nil {
		return err
	}
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Post(apiBaseURL+"/results", "application/json", bytes.NewReader(data))
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}
	return nil
}

// syncFromLocal copies challenges from ./challenges/ into the cache.
func syncFromLocal(challengesDir string) error {
	entries, err := os.ReadDir("challenges")
	if err != nil {
		return fmt.Errorf("no API and no local ./challenges/ directory found: %w", err)
	}

	count := 0
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		yamlPath := "challenges/" + e.Name() + "/challenge.yaml"
		data, err := os.ReadFile(yamlPath)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping %s: %v\n", e.Name(), err)
			continue
		}

		tmpFile := os.TempDir() + "/orbstack_validate_" + e.Name() + ".yaml"
		if err := os.WriteFile(tmpFile, data, 0644); err == nil {
			if _, parseErr := cache.ParseYAML(tmpFile); parseErr != nil {
				fmt.Fprintf(os.Stderr, "warn: skipping %s (parse error): %v\n", e.Name(), parseErr)
				os.Remove(tmpFile)
				continue
			}
			os.Remove(tmpFile)
		}

		if err := cache.SaveRaw(challengesDir, e.Name(), data); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", e.Name(), err)
			continue
		}

		validatorSrc := "challenges/" + e.Name() + "/validator.sh"
		if vData, err := os.ReadFile(validatorSrc); err == nil {
			vDest := challengesDir + "/" + e.Name() + "/validator.sh"
			os.WriteFile(vDest, vData, 0755)
		}

		fmt.Printf("  ✓ %s\n", e.Name())
		count++
	}

	if count == 0 {
		return fmt.Errorf("no valid challenges found in ./challenges/")
	}
	fmt.Printf("\nSynced %d local challenge(s) to %s\n", count, challengesDir)
	return nil
}