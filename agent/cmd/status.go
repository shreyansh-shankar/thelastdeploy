// agent/cmd/status.go
package cmd

import (
	"fmt"
	"path/filepath"
	"time"

	"github.com/orbstack/agent/internal/config"
	"github.com/orbstack/agent/internal/lab"
	"github.com/orbstack/agent/internal/localserver"
	"github.com/orbstack/agent/internal/queue"
)

func runStatus(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	orbstackDir := filepath.Dir(cfg.DeviceKeyPath)

	// ── Auth state ───────────────────────────────────────────────────────────
	fmt.Println()
	if cfg.AuthToken != "" {
		fmt.Println("● Auth")
		fmt.Println("  Authenticated: yes")
		fmt.Println("  Run 'orbstack logout' to sign out.")
	} else {
		fmt.Println("● Auth")
		fmt.Println("  Not logged in — run: orbstack login")
		fmt.Println("  (Results submitted without login earn no XP on the leaderboard.)")
	}

	// ── Active lab session ───────────────────────────────────────────────────
	session, err := lab.ReadSession()
	if err != nil {
		fmt.Println("\nNo active lab session.")
		fmt.Println("Run 'orbstack start <challenge-id>' to begin.")

		pending := queue.Count(orbstackDir)
		if pending > 0 {
			fmt.Printf("\n%d result(s) queued — run 'orbstack sync' to submit.\n", pending)
		}
		return nil
	}

	elapsed := time.Since(session.StartedAt).Round(time.Second)

	fmt.Printf("\n● Active Lab\n")
	fmt.Printf("  Challenge:  %s\n", session.ChallengeID)
	fmt.Printf("  Started:    %s\n", session.StartedAt.Format("15:04:05"))
	fmt.Printf("  Elapsed:    %s\n", elapsed)
	fmt.Printf("  Type:       %s\n", session.SetupType)
	fmt.Printf("  Validator:  %s\n", session.ValidatorPath)

	if session.ContainerID != "" {
		fmt.Printf("  Container:  %s\n", session.ContainerID[:12])
	}

	if localserver.IsRunning() {
		fmt.Printf("  API server: http://127.0.0.1:7842 ✓\n")
	} else {
		fmt.Printf("  API server: not running\n")
	}

	pending := queue.Count(orbstackDir)
	if pending > 0 {
		fmt.Printf("  Queued:     %d result(s) pending sync\n", pending)
	}

	fmt.Println()
	return nil
}