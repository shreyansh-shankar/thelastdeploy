// internal/lab/runner.go
package lab

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/thelastdeploy/agent/internal/cache"
)

// Start sets up the lab environment. Non-blocking — returns immediately
// after writing session.json so the terminal stays free.
func Start(lab *cache.Lab) error {
	if SessionExists() {
		existing, _ := ReadSession()
		if existing != nil {
			return fmt.Errorf("lab '%s' is already running — run 'tld stop' first", existing.LabID)
		}
	}

	fmt.Printf("\n╔══════════════════════════════════════════════╗\n")
	fmt.Printf("║  The Last Deploy — Starting: %-16s║\n", truncate(lab.Title, 16))
	fmt.Printf("╚══════════════════════════════════════════════╝\n\n")

	session := &Session{
		LabID:         lab.ID,
		ModuleID:      lab.ModuleID,
		SectionID:     lab.SectionID,
		StartedAt:     time.Now(),
		ValidatorPath: lab.ValidatorPath,
		SetupType:     lab.SetupType,
	}

	switch lab.SetupType {
	case "shell", "":
		if err := runShellSetup(lab); err != nil {
			return err
		}
	case "docker":
		containerID, err := StartDocker(lab)
		if err != nil {
			return err
		}
		session.ContainerID = containerID
	case "kind":
		if err := StartKind(lab); err != nil {
			return err
		}
	default:
		return fmt.Errorf("unknown setup type: %q (must be shell, docker, or kind)", lab.SetupType)
	}

	if _, err := os.Stat(session.ValidatorPath); err == nil {
		os.Chmod(session.ValidatorPath, 0755)
	}

	if err := WriteSession(session); err != nil {
		return fmt.Errorf("write session: %w", err)
	}

	printLab(lab)
	return nil
}

// Stop tears down the lab environment and clears the session.
func Stop() error {
	session, err := ReadSession()
	if err != nil {
		return err
	}

	fmt.Printf("Stopping lab: %s\n", session.LabID)
	elapsed := time.Since(session.StartedAt).Round(time.Second)
	fmt.Printf("Session duration: %s\n\n", elapsed)

	switch session.SetupType {
	case "docker":
		if err := StopDocker(session.ContainerID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	case "kind":
		if err := StopKind(session.LabID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	}

	if err := ClearSession(); err != nil {
		return fmt.Errorf("clear session: %w", err)
	}

	fmt.Println("✓ Lab stopped. Environment cleaned up.")
	fmt.Println("  Run 'tld sync --all' to see available labs.")
	return nil
}

func runShellSetup(lab *cache.Lab) error {
	if len(lab.SeedCommands) == 0 {
		return nil
	}
	fmt.Println("⚙  Running setup commands...")
	for _, command := range lab.SeedCommands {
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

func printLab(lab *cache.Lab) {
	fmt.Printf("📋 Lab:      %s\n", lab.Title)
	fmt.Printf("   ID:          %s\n", lab.ID)
	fmt.Printf("   Module:      %s\n", lab.ModuleID)
	fmt.Printf("   Section:     %s\n", lab.SectionID)
	fmt.Printf("   Type:        %s\n", lab.SetupType)
	fmt.Printf("   XP reward:   %d\n", lab.XP)
	fmt.Printf("   Est. time:   ~%d minutes\n\n", lab.EstimatedMins)
	fmt.Printf("──────────────────────────────────────────────\n")
	fmt.Printf("When you're done, run:  tld check\n")
	fmt.Printf("To stop the lab:        tld stop\n")
	fmt.Printf("──────────────────────────────────────────────\n\n")
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max-1] + "…"
}