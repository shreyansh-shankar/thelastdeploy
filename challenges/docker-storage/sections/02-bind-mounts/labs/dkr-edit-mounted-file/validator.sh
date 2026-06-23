#!/bin/bash
# validator.sh — docker-storage / 02-bind-mounts / dkr-edit-mounted-file
set -euo pipefail

# 1. Check if container exists and is running
if ! docker ps --filter name=notes-viewer --format '{{.Names}}' | grep -q "^notes-viewer$"; then
  echo "FAIL: Container 'notes-viewer' not found running."
  exit 1
fi

# 2. Check the file content inside the container
CONTENT=$(docker exec notes-viewer cat /notes/notes.txt 2>/dev/null || echo "")
CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '\r' | xargs)

if [ "$CONTENT_CLEANED" != "DevLab Rocks" ]; then
  echo "FAIL: The content inside the container is not 'DevLab Rocks'. Got: '$CONTENT_CLEANED'"
  exit 1
fi

echo "PASS: Successfully verified bind-mounted file edits."
exit 0
