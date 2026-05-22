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

// Start sets up the lab environment for a challenge.
// It dispatches on challenge.SetupType: "shell", "docker", or "kind".
func Start(c *cache.Challenge, challengesDir string) error {
	if SessionExists() {
		existing, _ := ReadSession()
		if existing != nil {
			return fmt.Errorf("lab '%s' is already running — run 'orbstack stop' first", existing.ChallengeID)
		}
	}

	fmt.Printf("\n╔══════════════════════════════════════════════╗\n")
	fmt.Printf("║  OrbStack — Starting: %-24s║\n", truncate(c.Title, 24))
	fmt.Printf("╚══════════════════════════════════════════════╝\n\n")

	session := &Session{
		ChallengeID:   c.ID,
		StartedAt:     time.Now(),
		ValidatorPath: filepath.Join(challengesDir, c.ID, c.ValidatorScript),
		SetupType:     c.SetupType,
	}

	switch c.SetupType {
	case "shell", "":
		if err := runShellSetup(c); err != nil {
			return err
		}

	case "docker":
		// Security note: resource limits (cpu, memory) from the YAML are
		// enforced as --cpus and --memory flags passed to docker run.
		// The container cannot exceed these limits regardless of what it runs.
		containerID, err := StartDocker(c)
		if err != nil {
			return err
		}
		session.ContainerID = containerID

	case "kind":
		if err := StartKind(c); err != nil {
			return err
		}

	default:
		return fmt.Errorf("unknown setup type: %q (must be shell, docker, or kind)", c.SetupType)
	}

	// Ensure validator script is executable
	if _, err := os.Stat(session.ValidatorPath); err == nil {
		os.Chmod(session.ValidatorPath, 0755)
	}

	if err := WriteSession(session); err != nil {
		return fmt.Errorf("write session: %w", err)
	}

	printChallenge(c)
	return nil
}

// Stop tears down whatever Start created.
// Clean teardown matters: leftover containers or clusters consume CPU and RAM
// in the background, and orphaned kind clusters clutter your kubectl contexts.
// We always clean up completely so the user's machine is back to baseline.
func Stop() error {
	session, err := ReadSession()
	if err != nil {
		return err
	}

	fmt.Printf("Stopping lab: %s\n", session.ChallengeID)
	elapsed := time.Since(session.StartedAt).Round(time.Second)
	fmt.Printf("Session duration: %s\n\n", elapsed)

	switch session.SetupType {
	case "docker":
		if err := StopDocker(session.ContainerID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	case "kind":
		if err := StopKind(session.ChallengeID); err != nil {
			fmt.Fprintf(os.Stderr, "warn: %v\n", err)
		}
	}

	if err := ClearSession(); err != nil {
		return fmt.Errorf("clear session: %w", err)
	}

	fmt.Println("✓ Lab stopped. Environment cleaned up.")
	fmt.Println("  Run 'orbstack sync' to see available challenges.")
	return nil
}

// runShellSetup runs the seed_commands for shell-type challenges directly on
// the host. This is safe because shell challenges are read-only env prep
// (e.g. creating temp files, pulling images). Heavy compute always goes inside
// Docker or kind.
func runShellSetup(c *cache.Challenge) error {
	if len(c.SeedCommands) == 0 {
		return nil
	}
	fmt.Println("⚙  Running setup commands...")
	for _, command := range c.SeedCommands {
		if err := runShellCommand(command); err != nil {
			return fmt.Errorf("seed command failed [%s]: %w", command, err)
		}
	}
	fmt.Println()
	return nil
}

// runShellCommand executes a single shell command string, streaming output.
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

func printChallenge(c *cache.Challenge) {
	fmt.Printf("📋 Challenge: %s\n", c.Title)
	fmt.Printf("   Topic:      %s\n", c.Topic)
	fmt.Printf("   Difficulty: %s\n", c.Difficulty)
	fmt.Printf("   XP reward:  %d\n", c.XP)
	fmt.Printf("   Est. time:  ~%d minutes\n\n", c.EstimatedMinutes)
	fmt.Printf("📝 Description:\n   %s\n\n", c.Description)
	fmt.Printf("📌 Steps:\n")
	for i, step := range c.Steps {
		fmt.Printf("\n  %d. %s\n", i+1, step.Title)
		fmt.Printf("     %s\n", step.Body)
		if step.Hint != "" {
			fmt.Printf("     💡 Hint: %s\n", step.Hint)
		}
	}
	fmt.Printf("\n──────────────────────────────────────────────\n")
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