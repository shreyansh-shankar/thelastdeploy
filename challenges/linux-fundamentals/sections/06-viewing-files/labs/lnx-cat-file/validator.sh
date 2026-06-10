#!/bin/bash
# validator.sh — linux-fundamentals / 06-viewing-files / lnx-cat-file
set -euo pipefail

FILE="$HOME/view-test/code.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/view-test/code.txt not found. Find the code inside short.txt and write it here."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "LINUX_RULES" ]; then
  echo "FAIL: Incorrect code in code.txt. Expected 'LINUX_RULES', got: '$CONTENT'"
  exit 1
fi

echo "PASS: File viewed and code extracted"
exit 0
