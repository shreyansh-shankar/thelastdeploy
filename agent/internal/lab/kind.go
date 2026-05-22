// agent/internal/lab/kind.go
package lab

// kind-type challenge support (Kubernetes).
//
// "kind" stands for Kubernetes IN Docker. It runs a full Kubernetes cluster
// inside Docker containers on your laptop — no cloud required. Each cluster
// is isolated and fully deletable.
//
// This file is a stub. kind support is built in step 9.
// For now, Start() will return a clear error if someone tries a kind challenge.

import (
	"fmt"
	"os/exec"

	"github.com/orbstack/agent/internal/cache"
)

// StartKind creates a kind cluster for the given challenge.
// The cluster is named "orbstack-<challenge-id>" so we can target it exactly
// with kubectl and delete it cleanly on stop.
func StartKind(c *cache.Challenge) error {
	if err := checkKindInstalled(); err != nil {
		return err
	}

	clusterName := "orbstack-" + c.ID
	fmt.Printf("  Creating kind cluster: %s\n", clusterName)

	out, err := exec.Command("kind", "create", "cluster", "--name", clusterName).CombinedOutput()
	if err != nil {
		return fmt.Errorf("kind create cluster failed: %w\n%s", err, string(out))
	}

	fmt.Printf("  ✓ Cluster ready: %s\n", clusterName)
	fmt.Printf("  Run: kubectl cluster-info --context kind-%s\n", clusterName)
	return nil
}

// StopKind deletes the kind cluster for the given challenge ID.
func StopKind(challengeID string) error {
	if err := checkKindInstalled(); err != nil {
		// If kind isn't installed the cluster can't exist — nothing to do.
		return nil
	}
	clusterName := "orbstack-" + challengeID
	fmt.Printf("  Deleting kind cluster: %s\n", clusterName)

	out, err := exec.Command("kind", "delete", "cluster", "--name", clusterName).CombinedOutput()
	if err != nil {
		// If the cluster doesn't exist, that's fine.
		if isNotExistError(string(out)) {
			return nil
		}
		return fmt.Errorf("kind delete cluster failed: %w\n%s", err, string(out))
	}
	return nil
}

func checkKindInstalled() error {
	if _, err := exec.LookPath("kind"); err != nil {
		return fmt.Errorf(
			"'kind' is not installed\n" +
				"  Install it with: brew install kind\n" +
				"  Or: https://kind.sigs.k8s.io/docs/user/quick-start/#installation",
		)
	}
	return nil
}

func isNotExistError(output string) bool {
	// kind prints this when you try to delete a cluster that doesn't exist.
	return len(output) > 0 &&
		(contains(output, "not found") || contains(output, "no kind clusters found"))
}

func contains(s, sub string) bool {
	return len(s) >= len(sub) && (s == sub || len(sub) == 0 ||
		func() bool {
			for i := 0; i <= len(s)-len(sub); i++ {
				if s[i:i+len(sub)] == sub {
					return true
				}
			}
			return false
		}())
}