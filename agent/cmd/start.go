// agent/cmd/start.go
package cmd

import (
	"context"
	"errors"
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"

	"github.com/orbstack/agent/internal/cache"
	"github.com/orbstack/agent/internal/config"
	"github.com/orbstack/agent/internal/lab"
	"github.com/orbstack/agent/internal/localserver"
)

func runStart(args []string) error {
	if len(args) < 1 {
		return errors.New("usage: orbstack start <module-id>")
	}
	moduleID := args[0]

	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// Check that the module directory exists in the cache (either module.json
	// from API sync or module.yaml from local sync will be inside it).
	moduleDir := filepath.Join(cfg.ChallengesDir, moduleID)
	if _, err := os.Stat(moduleDir); os.IsNotExist(err) {
		return fmt.Errorf("module '%s' not found — run 'orbstack sync' first", moduleID)
	}

	// LoadModule handles both module.json (API sync) and module.yaml (local sync).
	m, err := cache.LoadModule(cfg.ChallengesDir, moduleID)
	if err != nil {
		return fmt.Errorf("load module: %w", err)
	}

	if m.PracticalSectionID == "" {
		return fmt.Errorf("module '%s' has no practical section — nothing to start", moduleID)
	}

	if err := lab.Start(m, cfg.ChallengesDir); err != nil {
		return err
	}

	if localserver.IsRunning() {
		fmt.Println("  (local server already running on :7842)")
		return nil
	}

	srv := localserver.New(cfg.DeviceKeyPath)
	ctx, cancel := context.WithCancel(context.Background())

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-sigCh
		fmt.Println("\nInterrupt received — stopping lab...")
		cancel()
		lab.Stop()
	}()

	if err := srv.Start(ctx); err != nil {
		return fmt.Errorf("local server: %w", err)
	}
	return nil
}