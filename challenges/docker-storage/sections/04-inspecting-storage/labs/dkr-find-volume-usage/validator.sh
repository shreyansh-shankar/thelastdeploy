#!/bin/bash
# validator.sh — docker-storage / 04-inspecting-storage / dkr-find-volume-usage
set -euo pipefail

FILE_PATH="$HOME/docker-test/volume_destination.txt"

# 1. Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "FAIL: File '$FILE_PATH' not found."
  exit 1
fi

# 2. Check the content of the file
CONTENT=$(cat "$FILE_PATH" | tr -d '[:space:]')

if [ "$CONTENT" != "/var/log/analytics" ]; then
  echo "FAIL: The volume destination inside the file ('$CONTENT') is incorrect."
  exit 1
fi

echo "PASS: Successfully verified volume destination inspection."
exit 0
