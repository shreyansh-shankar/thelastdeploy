#!/bin/bash
# validator.sh — linux-fundamentals / 08-getting-help / lnx-man-pages
set -euo pipefail

FILE="$HOME/help-test/parents_flag.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/help-test/parents_flag.txt not found. Look up the flag to create parent directories in 'man mkdir' and save it here."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "-p" ] && [ "$CONTENT" != "--parents" ]; then
  echo "FAIL: Incorrect flag in parents_flag.txt. Expected '-p' or '--parents'. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Parents flag found successfully"
exit 0
