#!/bin/bash
# validator.sh — linux-fundamentals / 07-file-searching / lnx-grep-secret
set -euo pipefail

FILE="$HOME/search-test/secret_line.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/search-test/secret_line.txt not found. Find the matching secret line using grep and save it to secret_line.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "app_secret=devlab-key" ]; then
  echo "FAIL: File contents must be exactly 'app_secret=devlab-key'. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Secret line grepped successfully"
exit 0
