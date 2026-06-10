#!/bin/bash
# validator.sh — linux-fundamentals / 04-navigation / lnx-pwd-navigation
set -euo pipefail

FILE="$HOME/current_path.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File current_path.txt not found in your home directory ($HOME). Run 'pwd > ~/current_path.txt' from your home directory."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
EXPECTED=$(eval echo \$HOME)
if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Path in ~/current_path.txt ($CONTENT) does not match your home directory ($EXPECTED)."
  exit 1
fi

echo "PASS: Working directory saved successfully"
exit 0
