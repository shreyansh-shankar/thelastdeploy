#!/bin/bash
# validator.sh — docker-fundamentals / 04-container-lifecycle / dkr-stop-running-container
set -euo pipefail

# Check if the container runaway-container exists
if ! docker ps -a --filter name=runaway-container --format '{{.Names}}' | grep -q "runaway-container"; then
  echo "FAIL: Container 'runaway-container' not found. It must exist but be in a stopped state."
  exit 1
fi

# Check if it is running
RUNNING=$(docker inspect runaway-container --format '{{.State.Running}}')

if [ "$RUNNING" = "true" ]; then
  echo "FAIL: Container 'runaway-container' is still running."
  exit 1
fi

echo "PASS: Running container stopped successfully."
exit 0
