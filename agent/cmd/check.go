// agent/cmd/check.go
package cmd

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/orbstack/agent/internal/config"
	"github.com/orbstack/agent/internal/lab"
	"github.com/orbstack/agent/internal/queue"
	"github.com/orbstack/agent/internal/validator"
)

func runCheck(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	session, err := lab.ReadSession()
	if err != nil {
		return err
	}

	fmt.Printf("Running validator for: %s\n\n", session.ChallengeID)

	result, err := validator.Run(session.ChallengeID, session.ValidatorPath, cfg.DeviceKeyPath)
	if err != nil {
		return fmt.Errorf("validator error: %w", err)
	}

	fmt.Printf("Output:\n  %s\n\n", result.Output)

	if result.Passed {
		fmt.Println("✅ PASSED")
	} else {
		fmt.Println("❌ FAILED")
		fmt.Println("\nTry again and run 'orbstack check' when ready.")
		return nil
	}

	// Attempt to POST result to the API.
	orbstackDir := filepath.Dir(cfg.DeviceKeyPath) // ~/.orbstack
	if err := postResult(cfg.APIBaseURL, result); err != nil {
		// Backend unreachable — save to queue for next sync.
		fmt.Printf("\n(Could not reach API: %v)\n", err)

		entry := &queue.Entry{
			ChallengeID: result.ChallengeID,
			Passed:      result.Passed,
			Output:      result.Output,
			RanAt:       result.RanAt,
			Signature:   result.Signature,
		}
		if saveErr := queue.Save(orbstackDir, entry); saveErr != nil {
			fmt.Fprintf(os.Stderr, "warn: could not queue result: %v\n", saveErr)
			fmt.Println("Your pass was NOT saved — run 'orbstack check' again when the API is reachable.")
		} else {
			fmt.Println("Result queued — will sync automatically next time you run 'orbstack sync'.")
		}
	}
	return nil
}

func postResult(apiBaseURL string, r *validator.Result) error {
	data, err := json.MarshalIndent(r, "", "  ")
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
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, string(body))
	}

	var respBody map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&respBody); err == nil {
		if xp, ok := respBody["xp_awarded"]; ok {
			fmt.Printf("\n🎉 +%.0f XP awarded!\n", xp.(float64))
		}
	}
	return nil
}