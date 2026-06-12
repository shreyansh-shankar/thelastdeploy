#!/bin/bash
# validator.sh — linux-processes-services / 02-ps-and-top / lnx-list-running-processes
set -euo pipefail

TARGET_FILE="$HOME/process-test/my_processes.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

LINE_COUNT=$(wc -l < "$TARGET_FILE")
if [ "$LINE_COUNT" -lt 2 ]; then
  echo "FAIL: The process list file contains too few lines. Did you dump your process list?"
  exit 1
fi

# Check if file has reference to common shell items like 'bash' or 'ps' or 'PID'
if ! grep -qE "PID|bash|tld|ps" "$TARGET_FILE"; then
  echo "FAIL: The content in $TARGET_FILE does not look like a process listing."
  exit 1
fi

echo "PASS: Process list recorded successfully."
exit 0
