#!/bin/bash
# validator.sh — linux-fundamentals / 07-file-searching / lnx-combined-search
set -euo pipefail

FILE="$HOME/search-test/fatal_log.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/search-test/fatal_log.txt not found. Find the file containing 'FATAL' and save its name/path to fatal_log.txt."
  exit 1
fi

CONTENT=$(basename $(tr -d '\r\n' < "$FILE" | xargs))
if [ "$CONTENT" != "error-log-1.txt" ]; then
  echo "FAIL: Expected 'error-log-1.txt' in fatal_log.txt, got: '$CONTENT'"
  exit 1
fi

echo "PASS: Fatal log file found successfully"
exit 0
