#!/bin/bash
# validator.sh — linux-fundamentals / 05-file-operations / lnx-copy-files
set -euo pipefail

FILE="$HOME/files-test/destination.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/files-test/destination.txt not found. Copy source.txt to destination.txt inside ~/files-test."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "copy-me" ]; then
  echo "FAIL: Content of destination.txt does not match source.txt (expected 'copy-me')."
  exit 1
fi

echo "PASS: File copied successfully"
exit 0
