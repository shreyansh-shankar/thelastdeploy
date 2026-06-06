// cmd/start.go
package cmd

import (
	"errors"
	"fmt"
	"os"

	"github.com/thelastdeploy/agent/internal/cache"
	"github.com/thelastdeploy/agent/internal/config"
	"github.com/thelastdeploy/agent/internal/lab"
	"github.com/thelastdeploy/agent/internal/localserver"
)

func runStart(args []string) error {
	if len(args) < 1 {
		return errors.New("usage: tld start <lab-id>")
	}
	labID := args[0]

	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// Find the lab by its globally-unique ID across all modules/sections.
	l, err := cache.FindLab(cfg.ChallengesDir, labID)
	if err != nil {
		return err
	}

	if err := lab.Start(l); err != nil {
		return err
	}

	// Start the local server in the background — non-blocking.
	if localserver.IsRunning() {
		fmt.Println("  (local server already running on :7842)")
		return nil
	}

	srv := localserver.New(cfg.DeviceKeyPath)
	go func() {
		if err := srv.StartBackground(); err != nil {
			fmt.Fprintf(os.Stderr, "warn: local server stopped: %v\n", err)
		}
	}()

	fmt.Println("  Local API server started on http://127.0.0.1:7842")
	return nil
}