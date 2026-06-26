#!/bin/bash
# validator.sh — docker-troubleshooting / 01-reading-docker-errors / dkr-identify-startup-error
set -euo pipefail

FILE_PATH="$HOME/docker-troubleshooting/errors/startup-token.txt"

# 1. Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "FAIL: File not found at '$FILE_PATH'."
  exit 1
fi

# 2. Check token contents
TOKEN=$(tr -d '\r' < "$FILE_PATH" | xargs)

if [ "$TOKEN" != "ERR_TOKEN_XY123" ]; then
  echo "FAIL: Token '$TOKEN' is incorrect. Double check container logs."
  exit 1
fi

echo "PASS: Successfully extracted the startup error token!"
exit 0
