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
		return errors.New("usage: orbstack start <challenge-id>")
	}
	id := args[0]

	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// Resolve the challenge YAML from the cache directory.
	yamlPath := filepath.Join(cfg.ChallengesDir, id, "challenge.yaml")
	if _, err := os.Stat(yamlPath); os.IsNotExist(err) {
		return fmt.Errorf("challenge '%s' not found — run 'orbstack sync' first", id)
	}

	c, err := cache.ParseYAML(yamlPath)
	if err != nil {
		return fmt.Errorf("parse challenge: %w", err)
	}

	// Start the lab environment (writes session, prints steps).
	if err := lab.Start(c, cfg.ChallengesDir); err != nil {
		return err
	}

	// Start the local HTTP server on 127.0.0.1:7842.
	// If it's already running (e.g. left over from a previous start), skip.
	if localserver.IsRunning() {
		fmt.Println("  (local server already running on :7842)")
		return nil
	}

	srv := localserver.New(cfg.DeviceKeyPath)
	ctx, cancel := context.WithCancel(context.Background())

	// Catch Ctrl+C / SIGTERM — stop the lab cleanly instead of leaving
	// containers or kind clusters running in the background.
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-sigCh
		fmt.Println("\nInterrupt received — stopping lab...")
		cancel()
		lab.Stop()
	}()

	// Blocking: server runs until cancelled.
	if err := srv.Start(ctx); err != nil {
		return fmt.Errorf("local server: %w", err)
	}
	return nil
}