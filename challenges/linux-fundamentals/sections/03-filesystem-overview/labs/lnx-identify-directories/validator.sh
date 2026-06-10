#!/bin/bash
# validator.sh — linux-fundamentals / 03-filesystem-overview / lnx-identify-directories
set -euo pipefail

FILE="$HOME/directories.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File directories.txt not found in your home directory ($HOME). Write the path of the system configurations folder (e.g. '/etc') into ~/directories.txt to complete this lab."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "/etc" ]; then
  echo "FAIL: The content in directories.txt must be the absolute path of the system configurations folder. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Configuration directory identified"
exit 0
