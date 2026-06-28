#!/bin/bash
# validator.sh — k8s-pods / 03-inspecting-pods / k8s-view-pod-logs
set -euo pipefail

FILE="$HOME/k8s-pods/flag.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you find the log flag?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="FLAG_LOG_MESSAGE_9921"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect value in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Pod log message verified successfully!"
exit 0
