#!/bin/bash
# validator.sh — docker-images / 03-inspecting-images / dkr-find-image-metadata
set -euo pipefail

FILE_PATH="$HOME/docker-test/image_arch.txt"

# 1. Check if the file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "FAIL: File '$FILE_PATH' not found."
  exit 1
fi

# 2. Get expected architecture
EXPECTED_ARCH=$(docker image inspect -f '{{.Architecture}}' alpine:3.18.5 2>/dev/null || echo "")
if [ -z "$EXPECTED_ARCH" ]; then
  echo "FAIL: Could not inspect alpine:3.18.5. Is it pulled?"
  exit 1
fi

# 3. Read and compare file content
USER_ARCH=$(cat "$FILE_PATH" | tr -d '[:space:]')

if [ "$USER_ARCH" != "$EXPECTED_ARCH" ]; then
  echo "FAIL: Architecture in file ('$USER_ARCH') does not match image architecture ('$EXPECTED_ARCH')."
  exit 1
fi

echo "PASS: Successfully extracted image architecture metadata."
exit 0
