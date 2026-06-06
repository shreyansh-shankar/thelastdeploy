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

	"github.com/thelastdeploy/agent/internal/cache"
	"github.com/thelastdeploy/agent/internal/config"
	"github.com/thelastdeploy/agent/internal/queue"
)

// modulesResponse matches GET /modules
type modulesResponse struct {
	Modules []moduleJSON `json:"modules"`
}

// moduleJSON matches the structured object the backend returns per module.
type moduleJSON struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	Description      string   `json:"description"`
	Topic            string   `json:"topic"`
	Difficulty       string   `json:"difficulty"`
	EstimatedMinutes int      `json:"estimated_minutes"`
	Tags             []string `json:"tags"`
	TotalXP          int      `json:"total_xp"`
	TotalSections    int      `json:"total_sections"`
}

func runSync(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	tldkDir := filepath.Dir(cfg.DeviceKeyPath)

	apiReachable := drainQueue(cfg.APIBaseURL, cfg.AuthToken, tldDir)

	fmt.Printf("Syncing modules from %s...\n", cfg.APIBaseURL)

	if !apiReachable {
		fmt.Println("API unreachable — falling back to local module files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(cfg.APIBaseURL + "/modules")
	if err != nil {
		fmt.Println("API unreachable — falling back to local module files...")
		return syncFromLocal(cfg.ChallengesDir)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("read response: %w", err)
	}

	if len(body) > 0 && body[0] == '<' {
		fmt.Printf("Port %s is taken by another service (got HTML, not our API).\n", cfg.APIBaseURL)
		fmt.Printf("Tip: edit ~/.tld/config.yaml to change api_base_url.\n\n")
		fmt.Println("Falling back to local module files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}

	var mr modulesResponse
	if err := json.Unmarshal(body, &mr); err != nil {
		fmt.Println("API response not recognised — falling back to local module files...")
		return syncFromLocal(cfg.ChallengesDir)
	}

	if len(mr.Modules) == 0 {
		fmt.Println("No modules returned from API.")
		return nil
	}

	for _, m := range mr.Modules {
		// Save the structured JSON so ParseModuleJSON can read it back.
		data, err := json.MarshalIndent(m, "", "  ")
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to marshal %s: %v\n", m.ID, err)
			continue
		}
		if err := cache.SaveModuleJSON(cfg.ChallengesDir, m.ID, data); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", m.ID, err)
			continue
		}
		// Also sync sections from local ./challenges/ if they exist.
		syncSections(m.ID, cfg.ChallengesDir)
		fmt.Printf("  ✓ %s\n", m.ID)
	}

	fmt.Printf("\nSynced %d module(s) to %s\n", len(mr.Modules), cfg.ChallengesDir)
	return nil
}

// drainQueue attempts to POST any queued results to the API.
func drainQueue(apiBaseURL, authToken, tldDir string) bool {
    entries, err := queue.LoadAll(tldDir)
    if err != nil || len(entries) == 0 {
        client := &http.Client{Timeout: 3 * time.Second}
        resp, err := client.Get(apiBaseURL + "/health")
        if err != nil {
            return false
        }
        resp.Body.Close()
        return resp.StatusCode < 500
    }

    fmt.Printf("Flushing %d queued result(s) to API...\n", len(entries))
    reachable := false
    for _, entry := range entries {
        if err := postQueuedEntry(apiBaseURL, authToken, entry); err != nil {
            fmt.Fprintf(os.Stderr, "  ✗ %s (queued %s ago): %v\n",
                entry.LabID,
                time.Since(entry.QueuedAt).Round(time.Second),
                err,
            )
            continue
        }
        reachable = true
        if err := queue.Delete(tldDir, entry.LabID, entry.QueuedAt); err != nil {
            fmt.Fprintf(os.Stderr, "  warn: could not remove queue entry: %v\n", err)
        } else {
            fmt.Printf("  ✓ %s (queued %s ago) — synced\n",
                entry.LabID,
                time.Since(entry.QueuedAt).Round(time.Second),
            )
        }
    }
    return reachable
}

func postQueuedEntry(apiBaseURL, authToken string, entry *queue.Entry) error {
	data, err := json.MarshalIndent(entry, "", "  ")
	if err != nil {
		return err
	}

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodPost, apiBaseURL+"/results", bytes.NewReader(data))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	if authToken != "" {
		req.Header.Set("Authorization", "Bearer "+authToken)
	}

	resp, err := client.Do(req)
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

// syncFromLocal reads modules from ./challenges/ and copies them into the cache.
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
		moduleID := e.Name()
		yamlPath := filepath.Join("challenges", moduleID, "module.yaml")
		data, err := os.ReadFile(yamlPath)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping %s (no module.yaml): %v\n", moduleID, err)
			continue
		}

		if err := cache.SaveRaw(challengesDir, moduleID, data); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", moduleID, err)
			continue
		}

		syncSections(moduleID, challengesDir)
		fmt.Printf("  ✓ %s\n", moduleID)
		count++
	}

	if count == 0 {
		return fmt.Errorf("no valid modules found in ./challenges/")
	}
	fmt.Printf("\nSynced %d local module(s) to %s\n", count, challengesDir)
	return nil
}

func syncSections(moduleID, challengesDir string) {
	srcSectionsDir := filepath.Join("challenges", moduleID, "sections")
	dstSectionsDir := filepath.Join(challengesDir, moduleID, "sections")

	sections, err := os.ReadDir(srcSectionsDir)
	if err != nil {
		return
	}

	for _, sec := range sections {
		if !sec.IsDir() {
			continue
		}
		srcSecDir := filepath.Join(srcSectionsDir, sec.Name())
		dstSecDir := filepath.Join(dstSectionsDir, sec.Name())
		os.MkdirAll(dstSecDir, 0755)

		for _, fname := range []string{"section.yaml", "content.md"} {
			if data, err := os.ReadFile(filepath.Join(srcSecDir, fname)); err == nil {
				os.WriteFile(filepath.Join(dstSecDir, fname), data, 0644)
			}
		}

		// Sync all labs inside this section.
		srcLabsDir := filepath.Join(srcSecDir, "labs")
		labs, err := os.ReadDir(srcLabsDir)
		if err != nil {
			continue
		}
		for _, l := range labs {
			if !l.IsDir() {
				continue
			}
			syncLabFiles(moduleID, sec.Name(), l.Name(), challengesDir)
		}
	}
}

func syncLabFiles(moduleID, sectionID, labID, challengesDir string) {
	srcDir := filepath.Join("challenges", moduleID, "sections", sectionID, "labs", labID)
	dstDir := filepath.Join(challengesDir, moduleID, "sections", sectionID, "labs", labID)
	os.MkdirAll(dstDir, 0755)
	for _, fname := range []string{"lab.yaml", "validator.sh"} {
		if data, err := os.ReadFile(filepath.Join(srcDir, fname)); err == nil {
			os.WriteFile(filepath.Join(dstDir, fname), data, 0755)
		}
	}
}