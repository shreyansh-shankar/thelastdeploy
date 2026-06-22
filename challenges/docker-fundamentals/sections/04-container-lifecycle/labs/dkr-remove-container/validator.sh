#!/bin/bash
# validator.sh — docker-fundamentals / 04-container-lifecycle / dkr-remove-container
set -euo pipefail

# Check if old-trash-container exists (either running or stopped)
if docker ps -a --filter name=old-trash-container --format '{{.Names}}' | grep -q "old-trash-container"; then
  echo "FAIL: Container 'old-trash-container' still exists."
  exit 1
fi

echo "PASS: Stopped container removed successfully."
exit 0
