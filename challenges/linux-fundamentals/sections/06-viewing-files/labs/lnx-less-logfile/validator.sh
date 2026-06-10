#!/bin/bash
# validator.sh — linux-fundamentals / 06-viewing-files / lnx-less-logfile
set -euo pipefail

FILE="$HOME/view-test/error_time.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/view-test/error_time.txt not found. Find the error timestamp in system.log and write it to error_time.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "2026-06-10T12:00:00Z" ]; then
  echo "FAIL: Incorrect timestamp in error_time.txt. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Log searched successfully"
exit 0
