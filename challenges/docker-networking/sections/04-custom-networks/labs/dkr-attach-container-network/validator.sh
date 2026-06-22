#!/bin/bash
# validator.sh — docker-networking / 04-custom-networks / dkr-attach-container-network
set -euo pipefail

# Check if container isolated-app is running
if ! docker ps --filter name=isolated-app --format '{{.Names}}' | grep -q "isolated-app"; then
  echo "FAIL: Container 'isolated-app' is not running."
  exit 1
fi

# Verify if it is connected to production-net
NETWORKS=$(docker inspect isolated-app --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' 2>/dev/null || echo "")

if [[ "$NETWORKS" != *"production-net"* ]]; then
  echo "FAIL: Container 'isolated-app' is not connected to 'production-net'. Connected networks: '$NETWORKS'"
  exit 1
fi

echo "PASS: Container successfully attached to custom network."
exit 0
