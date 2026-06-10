#!/bin/bash
# validator.sh — linux-fundamentals / 04-navigation / lnx-find-target-directory
set -euo pipefail

FILE="$HOME/found_path.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/found_path.txt not found. Find the deeply nested target folder and save its absolute path to found_path.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
EXPECTED=$(eval echo \$HOME/search-zone/sub1/sub2/sub3/target)
if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Expected path in ~/found_path.txt to be $EXPECTED, got: $CONTENT"
  exit 1
fi

echo "PASS: Deeply nested directory found"
exit 0
