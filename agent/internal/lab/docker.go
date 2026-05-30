// agent/internal/lab/docker.go
package lab

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/orbstack/agent/internal/cache"
)

// StartDocker launches a detached Docker container for the given module.
// Returns the container ID assigned by Docker so we can stop it later.
func StartDocker(m *cache.Module) (string, error) {
	if err := exec.Command("docker", "info").Run(); err != nil {
		return "", fmt.Errorf("docker is not running — please start Docker Desktop first")
	}

	args := buildDockerArgs(m)

	detachArgs := append([]string{"run", "--detach"}, args...)
	outBytes, err := exec.Command("docker", detachArgs...).Output()
	if err != nil {
		return "", fmt.Errorf("docker run failed: %w", err)
	}
	containerID := strings.TrimSpace(string(outBytes))
	fmt.Printf("  ✓ Container started: %s\n", shortID(containerID))
	return containerID, nil
}

// StopDocker removes the container by ID.
func StopDocker(containerID string) error {
	if containerID == "" {
		return nil
	}
	fmt.Printf("  Removing container %s...\n", shortID(containerID))
	out, err := exec.Command("docker", "rm", "-f", containerID).CombinedOutput()
	if err != nil {
		if strings.Contains(string(out), "No such container") {
			return nil
		}
		return fmt.Errorf("docker rm failed: %w\n%s", err, string(out))
	}
	return nil
}

func buildDockerArgs(m *cache.Module) []string {
	cpu := m.ResourceLimitsCPU
	mem := m.ResourceLimitsMem
	if cpu == 0 {
		cpu = 1
	}
	if mem == 0 {
		mem = 512
	}

	args := []string{
		fmt.Sprintf("--cpus=%.1f", float64(cpu)),
		fmt.Sprintf("--memory=%dm", mem),
		"--rm",
		"--name", "orbstack-" + m.ID,
	}

	image := m.Topic + ":latest"
	args = append(args, image)
	for _, cmd := range m.SeedCommands {
		args = append(args, strings.Fields(cmd)...)
	}
	return args
}

func shortID(id string) string {
	if len(id) > 12 {
		return id[:12]
	}
	return id
}

// Ensure os is used (streaming output on non-detach path kept for future use).
var _ = os.Stdout