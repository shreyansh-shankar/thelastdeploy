#!/bin/bash
# validator.sh — docker-fundamentals / 04-container-lifecycle / dkr-start-stopped-container
set -euo pipefail

# Check if the container stopped-sleeper exists
if ! docker ps -a --filter name=stopped-sleeper --format '{{.Names}}' | grep -q "stopped-sleeper"; then
  echo "FAIL: Container 'stopped-sleeper' not found."
  exit 1
fi

# Check if it is running
RUNNING=$(docker inspect stopped-sleeper --format '{{.State.Running}}')

if [ "$RUNNING" != "true" ]; then
  echo "FAIL: Container 'stopped-sleeper' exists but is not running."
  exit 1
fi

echo "PASS: Stopped container started successfully."
exit 0
