#!/bin/bash
# validator.sh — docker-storage / 05-backup-and-restore / dkr-backup-volume
set -euo pipefail

TAR_PATH="$HOME/docker-backup/backup.tar"

# 1. Check if the tarball exists
if [ ! -f "$TAR_PATH" ]; then
  echo "FAIL: Backup archive 'backup.tar' not found in ~/docker-backup/."
  exit 1
fi

# 2. Extract and inspect archive contents
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

if ! tar -xf "$TAR_PATH" -C "$TEMP_DIR" 2>/dev/null; then
  echo "FAIL: Failed to extract ~/docker-backup/backup.tar. Is it a valid tar file?"
  exit 1
fi

FOUND_FILE=$(find "$TEMP_DIR" -name "important_backup_data.txt" | head -n 1)
if [ -z "$FOUND_FILE" ]; then
  echo "FAIL: File 'important_backup_data.txt' not found inside the backup archive."
  exit 1
fi

CONTENT=$(cat "$FOUND_FILE" | tr -d '\r' | xargs)
if [ "$CONTENT" != "Secret Database Content v2" ]; then
  echo "FAIL: Backup file content does not match. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully verified volume backup tarball."
exit 0
