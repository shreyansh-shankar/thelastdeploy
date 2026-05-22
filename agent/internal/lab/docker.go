// agent/internal/lab/docker.go
package lab

// Docker-type challenge support.
//
// Quick concept: os/exec is Go's equivalent of Node's child_process. When we
// call exec.Command("docker", "run", ...) Go forks a child process, runs the
// docker CLI, and we can capture its output or stream it to the terminal.
// The resource limits (CPU, memory) are flags we pass directly to `docker run`
// — Docker enforces them via Linux cgroups under the hood.

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/orbstack/agent/internal/cache"
)

// StartDocker launches a detached Docker container for the given challenge.
// It returns the container ID assigned by Docker so we can stop it later.
//
// Security: we pass --cpus and --memory to enforce the resource limits from
// the YAML. A challenge cannot exceed what is declared in its own config.
func StartDocker(c *cache.Challenge) (string, error) {
	// Check Docker is installed and the daemon is running.
	if err := exec.Command("docker", "info").Run(); err != nil {
		return "", fmt.Errorf("docker is not running — please start Docker Desktop first")
	}

	args := buildDockerArgs(c)
	fmt.Printf("  $ docker run %s\n", strings.Join(args, " "))

	cmd := exec.Command("docker", append([]string{"run"}, args...)...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// For seed_commands on docker-type we run the container in the background
	// (--detach) and capture the container ID from stdout.
	// Re-build args with --detach and capture output.
	detachArgs := append([]string{"run", "--detach"}, args...)
	outBytes, err := exec.Command("docker", detachArgs...).Output()
	if err != nil {
		return "", fmt.Errorf("docker run failed: %w", err)
	}

	containerID := strings.TrimSpace(string(outBytes))
	fmt.Printf("  ✓ Container started: %s\n", shortID(containerID))
	return containerID, nil
}

// StopDocker removes the container by ID. We use `docker rm -f` so it works
// whether the container is running or already stopped.
func StopDocker(containerID string) error {
	if containerID == "" {
		return nil
	}
	fmt.Printf("  Removing container %s...\n", shortID(containerID))
	out, err := exec.Command("docker", "rm", "-f", containerID).CombinedOutput()
	if err != nil {
		// If the container is already gone, that's fine.
		if strings.Contains(string(out), "No such container") {
			return nil
		}
		return fmt.Errorf("docker rm failed: %w\n%s", err, string(out))
	}
	return nil
}

// buildDockerArgs constructs the arguments for `docker run` from the challenge.
// We always enforce the resource limits declared in the YAML — this is how we
// prevent a challenge container from consuming unlimited CPU or RAM.
func buildDockerArgs(c *cache.Challenge) []string {
	cpu := c.ResourceLimitsCPU
	mem := c.ResourceLimitsMem
	if cpu == 0 {
		cpu = 1 // safe default if not specified
	}
	if mem == 0 {
		mem = 512 // safe default: 512 MB
	}

	args := []string{
		fmt.Sprintf("--cpus=%.1f", float64(cpu)),
		fmt.Sprintf("--memory=%dm", mem),
		"--rm",                              // auto-remove when stopped
		"--name", "orbstack-" + c.ID,        // predictable name for easy lookup
	}

	// If the challenge specifies seed_commands, they become the container's CMD.
	// Otherwise we just run the image and let it exit naturally.
	// The image name defaults to the challenge topic + ":latest" if not specified.
	image := c.Topic + ":latest"

	args = append(args, image)

	for _, cmd := range c.SeedCommands {
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