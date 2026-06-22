#!/bin/bash
# validator.sh — docker-networking / 04-custom-networks / dkr-create-bridge-network
set -euo pipefail

# Check if network exists
if ! docker network ls --format '{{.Name}}' | grep -q "^custom-bridge-net$"; then
  echo "FAIL: Network 'custom-bridge-net' not found."
  exit 1
fi

# Verify network driver is bridge
DRIVER=$(docker network inspect custom-bridge-net --format '{{.Driver}}' 2>/dev/null || echo "")

if [ "$DRIVER" != "bridge" ]; then
  echo "FAIL: Network 'custom-bridge-net' exists but does not use 'bridge' driver. Driver: '$DRIVER'"
  exit 1
fi

echo "PASS: Bridge network created successfully."
exit 0
