#!/bin/bash
# validator.sh — linux-fundamentals / 08-getting-help / lnx-help-flags
set -euo pipefail

FILE="$HOME/help-test/size_flag.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/help-test/size_flag.txt not found. Look up the size-sorting flag in 'ls --help' and save it here."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "-S" ]; then
  echo "FAIL: Incorrect flag in size_flag.txt. Expected '-S', got: '$CONTENT'"
  exit 1
fi

echo "PASS: Size flag found successfully"
exit 0
