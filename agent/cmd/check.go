// cmd/check.go
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

	"github.com/thelastdeploy/agent/internal/config"
	"github.com/thelastdeploy/agent/internal/lab"
	"github.com/thelastdeploy/agent/internal/queue"
	"github.com/thelastdeploy/agent/internal/validator"
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

	fmt.Printf("Running validator for lab: %s\n\n", session.LabID)

	result, err := validator.Run(session.LabID, session.SectionID, session.ValidatorPath, cfg.DeviceKeyPath)
	if err != nil {
		return fmt.Errorf("validator error: %w", err)
	}

	fmt.Printf("Output:\n  %s\n\n", result.Output)

	if result.Passed {
		fmt.Println("✅ PASSED")
	} else {
		fmt.Println("❌ FAILED")
		fmt.Println("\nTry again and run 'tld check' when ready.")
		return nil
	}

	tldDir := filepath.Dir(cfg.DeviceKeyPath)
	err, retry := postResult(cfg.APIBaseURL, cfg.AuthToken, session.LabID, session.SectionID, result)
	if err != nil {
		if strings.Contains(err.Error(), "Validator script mismatch") {
			fmt.Println("\n⚠️  INTEGRITY ERROR: Validator script mismatch!")
			fmt.Println("   The local validator script has been modified or is out of date.")
			fmt.Println("   To restore the official version, please run: tld sync")
		} else {
			fmt.Printf("\n(Submission failed: %v)\n", err)
		}
		if retry {
			entry := &queue.Entry{
				LabID:         session.LabID,
				SectionID:     session.SectionID,
				Passed:        result.Passed,
				Output:        result.Output,
				RanAt:         result.RanAt,
				Signature:     result.Signature,
				ValidatorHash: result.ValidatorHash,
			}
			if saveErr := queue.Save(tldDir, entry); saveErr != nil {
				fmt.Fprintf(os.Stderr, "warn: could not queue result: %v\n", saveErr)
				fmt.Println("Your pass was NOT saved — run 'tld check' again when the API is reachable.")
			} else {
				fmt.Println("Result queued — will sync automatically next time you run 'tld sync --all'.")
			}
		} else {
			if !strings.Contains(err.Error(), "Validator script mismatch") {
				fmt.Println("Your pass was NOT saved because the request was rejected by the server.")
			}
		}
	}
	return nil
}

type resultPayload struct {
	LabID         string    `json:"lab_id"`
	SectionID     string    `json:"section_id"`
	Passed        bool      `json:"passed"`
	Output        string    `json:"output"`
	RanAt         time.Time `json:"ran_at"`
	Signature     string    `json:"signature"`
	ValidatorHash string    `json:"validator_hash"`
}

func postResult(apiBaseURL, authToken, labID, sectionID string, r *validator.Result) (error, bool) {
	payload := resultPayload{
		LabID:         labID,
		SectionID:     sectionID,
		Passed:        r.Passed,
		Output:        r.Output,
		RanAt:         r.RanAt,
		Signature:     r.Signature,
		ValidatorHash: r.ValidatorHash,
	}
	data, err := json.MarshalIndent(payload, "", "  ")
	if err != nil {
		return err, false
	}
	client := &http.Client{Timeout: 30 * time.Second}
	req, err := http.NewRequest(http.MethodPost, apiBaseURL+"/results", bytes.NewReader(data))
	if err != nil {
		return err, false
	}
	req.Header.Set("Content-Type", "application/json")
	if authToken != "" {
		req.Header.Set("Authorization", "Bearer "+authToken)
	}
	resp, err := client.Do(req)
	if err != nil {
		return err, true
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		retry := resp.StatusCode >= 500 || resp.StatusCode == http.StatusRequestTimeout || resp.StatusCode == http.StatusTooManyRequests
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body))), retry
	}
	var respBody map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&respBody); err == nil {
		if xp, ok := respBody["xp_awarded"]; ok {
			if xp.(float64) > 0 {
				fmt.Printf("\n🎉 +%.0f XP awarded!\n", xp.(float64))
			} else {
				fmt.Println("\n✅ Already completed — no new XP awarded.")
			}
		}
	}
	return nil, false
}