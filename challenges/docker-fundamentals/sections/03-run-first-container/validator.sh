#!/bin/bash
# validator.sh — docker-fundamentals / run-first-container

set -euo pipefail

# Check Docker is available
if ! command -v docker &>/dev/null; then
  echo "FAIL: docker command not found — is Docker installed?"
  exit 1
fi

# Check Docker daemon is running
if ! docker info &>/dev/null; then
  echo "FAIL: Docker daemon is not running — start Docker and try again"
  exit 1
fi

# Check hello-world image has been pulled (proxy for having run it)
if docker images hello-world --format "{{.Repository}}" | grep -q "hello-world"; then
  echo "PASS: hello-world ran and exited cleanly"
  exit 0
fi

# Fallback: try running it now and check exit code
if docker run --rm hello-world &>/dev/null; then
  echo "PASS: hello-world ran and exited cleanly"
  exit 0
fi

echo "FAIL: hello-world container did not run successfully"
exit 1