#!/bin/bash
# validator.sh — docker-networking / 05-restore-connectivity / dkr-fix-broken-container-network
set -euo pipefail

# Check if container broken-web exists and is running
if ! docker ps --filter name=broken-web --format '{{.Names}}' | grep -q "broken-web"; then
  echo "FAIL: Container 'broken-web' not found running."
  exit 1
fi

# Verify if it is connected to web-net
NETWORKS=$(docker inspect broken-web --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' 2>/dev/null || echo "")

if [[ "$NETWORKS" != *"web-net"* ]]; then
  echo "FAIL: Container 'broken-web' is not connected to 'web-net'. Connected networks: '$NETWORKS'"
  exit 1
fi

echo "PASS: Restored network connectivity successfully."
exit 0
