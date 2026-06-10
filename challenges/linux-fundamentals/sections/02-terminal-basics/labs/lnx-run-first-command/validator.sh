#!/bin/bash
# validator.sh — linux-fundamentals / 02-terminal-basics / lnx-run-first-command
set -euo pipefail

FILE="$HOME/first_command.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File first_command.txt not found in your home directory ($HOME). Run 'echo \"hello devlab\" > ~/first_command.txt' to complete this lab."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "hello devlab" ]; then
  echo "FAIL: File contents must be exactly 'hello devlab'. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: First command run successfully"
exit 0
