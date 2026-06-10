#!/bin/bash
# validator.sh — linux-fundamentals / 06-viewing-files / lnx-head-tail
set -euo pipefail

FILE="$HOME/view-test/end.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/view-test/end.txt not found. Find the last line of growth.txt and save it to end.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "last_line" ]; then
  echo "FAIL: Incorrect last line content in end.txt. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Last line extracted successfully"
exit 0
