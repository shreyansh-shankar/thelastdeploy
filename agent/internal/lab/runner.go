// agent/internal/lab/runner.go
package lab

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/orbstack/agent/internal/cache"
)

// Start sets up the lab environment for a module's practical section.
// It dispatches on module.SetupType: "shell", "docker", or "kind".
func Start(m *cache.Module, challengesDir string) error {
	if SessionExists() {
		existing, _ := ReadSession()
		if existing != nil {
			return fmt.Errorf("lab '%s' is already running — run 'orbstack stop' first", existing.ModuleID)
		}
	}

	fmt.Printf("\n╔══════════════════════════════════════════════╗\n")
	fmt.Printf("║  OrbStack — Starting: %-24s║\n", truncate(m.Title, 24))
	fmt.Printf("╚══════════════════════════════════════════════╝\n\n")

	session := &Session{
		ModuleID:      m.ID,
		SectionID:     m.PracticalSectionID,
		StartedAt:     time.Now(),
		ValidatorPath: m.ValidatorScript,
		SetupType:     m.SetupType,
	}

	switch m.SetupType {
	case "shell", "":
		if err := runShellSetup(m); err != nil {
			return err
		}

	case "docker":
		containerID, err := StartDocker(m)
		if err != nil {
			return err
		}
		session.ContainerID = containerID

	case "kind":
		if err := StartKind(m); err != nil {
			return err
		}

	default:
		return fmt.Errorf("unknown setup type: %q (must be shell, docker, or kind)", m.SetupType)
	}

	// Ensure validator script is executable.
	if _, err := os.Stat(session.ValidatorPath); err == nil {
		os.Chmod(session.ValidatorPath, 0755)
	}

	if err := WriteSession(session); err != nil {
		return fmt.Errorf("write session: %w", err)
	}

	printModule(m)
	return nil
}

// Stop tears down whatever Start created.
func Stop() error {
	session, err := ReadSession()
	if err != nil {
		return err
	}

	fmt.Printf("Stopping lab: %s / %s\n", session.ModuleID, session.SectionID)
	elapsed := time.Since(session.StartedAt).Round(time.Second)
	fmt.Printf("Session duration: %s\n\n", elapsed)

	switch session.SetupType {
	case "docker":
		if err := StopDocker(session.ContainerID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	case "kind":
		if err := StopKind(session.ModuleID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	}

	if err := ClearSession(); err != nil {
		return fmt.Errorf("clear session: %w", err)
	}

	fmt.Println("✓ Lab stopped. Environment cleaned up.")
	fmt.Println("  Run 'orbstack sync' to see available modules.")
	return nil
}

// runShellSetup runs seed_commands for shell-type modules directly on the host.
func runShellSetup(m *cache.Module) error {
	if len(m.SeedCommands) == 0 {
		return nil
	}
	fmt.Println("⚙  Running setup commands...")
	for _, command := range m.SeedCommands {
		if err := runShellCommand(command); err != nil {
			return fmt.Errorf("seed command failed [%s]: %w", command, err)
		}
	}
	fmt.Println()
	return nil
}

func runShellCommand(command string) error {
	fmt.Printf("  $ %s\n", command)
	parts := strings.Fields(command)
	if len(parts) == 0 {
		return nil
	}
	var cmd *exec.Cmd
	if len(parts) == 1 {
		cmd = exec.Command(parts[0])
	} else {
		cmd = exec.Command(parts[0], parts[1:]...)
	}
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func printModule(m *cache.Module) {
	fmt.Printf("📋 Module:  %s\n", m.Title)
	fmt.Printf("   Topic:      %s\n", m.Topic)
	fmt.Printf("   Difficulty: %s\n", m.Difficulty)
	fmt.Printf("   XP reward:  %d\n", m.PracticalSectionXP)
	fmt.Printf("   Est. time:  ~%d minutes\n\n", m.EstimatedMinutes)
	fmt.Printf("   Practical section: %s\n\n", m.PracticalSectionID)
	fmt.Printf("──────────────────────────────────────────────\n")
	fmt.Printf("When you're done, run:  orbstack check\n")
	fmt.Printf("To quit:                Ctrl+C  (or orbstack stop)\n")
	fmt.Printf("──────────────────────────────────────────────\n\n")
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max-1] + "…"
}

// Ensure unused import doesn't break compile — filepath is used in Start
// via the session ValidatorPath which is already an absolute path from
// cache.LoadModule, so we only need it if we join paths here.
var _ = filepath.Join