#!/bin/bash
# validator.sh — linux-fundamentals / 04-navigation / lnx-cd-home
set -euo pipefail

FILE="$HOME/navigation-test/path.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/navigation-test/path.txt not found. Make sure you cd into ~/navigation-test/target and save the output of pwd there to ~/navigation-test/path.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
EXPECTED=$(eval echo \$HOME/navigation-test/target)
if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Expected path in ~/navigation-test/path.txt to be $EXPECTED, got: $CONTENT"
  exit 1
fi

echo "PASS: Navigation to target validated"
exit 0
