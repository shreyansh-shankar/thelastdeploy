// agent/cmd/logout.go
package cmd

import (
	"fmt"

	"github.com/orbstack/agent/internal/config"
)

func runLogout(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	if cfg.AuthToken == "" {
		fmt.Println("You are not currently logged in.")
		return nil
	}

	cfg.AuthToken = ""
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("save config: %w", err)
	}

	fmt.Println("✓ Logged out.")
	fmt.Println("  Run 'orbstack login' to authenticate again.")
	return nil
}