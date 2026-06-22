#!/bin/bash
# validator.sh — docker-networking / 03-container-to-container / dkr-debug-connection-failure
set -euo pipefail

FILE="$HOME/docker-test/debug_output.txt"

# 1. Check if client-app is attached to debug-net
NETWORKS=$(docker inspect client-app --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' 2>/dev/null || echo "")

if [[ "$NETWORKS" != *"debug-net"* ]]; then
  echo "FAIL: Container 'client-app' is not connected to 'debug-net'. Networks found: '$NETWORKS'"
  exit 1
fi

# 2. Check if output file exists and has correct content
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/docker-test/debug_output.txt not found. Execute a curl request from client-app and save output."
  exit 1
fi

if ! grep -q "Welcome to nginx!" "$FILE"; then
  echo "FAIL: Page fetched in debug_output.txt does not match Nginx output."
  exit 1
fi

echo "PASS: Successfully debugged network connection and linked containers."
exit 0
