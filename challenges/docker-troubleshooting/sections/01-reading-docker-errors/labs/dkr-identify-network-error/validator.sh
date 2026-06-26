#!/bin/bash
# validator.sh — docker-troubleshooting / 01-reading-docker-errors / dkr-identify-network-error
set -euo pipefail

FILE_PATH="$HOME/docker-troubleshooting/errors/network-port.txt"

# 1. Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "FAIL: File not found at '$FILE_PATH'."
  exit 1
fi

# 2. Check port contents
PORT=$(tr -d '\r' < "$FILE_PATH" | xargs)

if [ "$PORT" != "9999" ]; then
  echo "FAIL: Port '$PORT' is incorrect. Check client logs."
  exit 1
fi

echo "PASS: Successfully extracted the network failure port!"
exit 0
