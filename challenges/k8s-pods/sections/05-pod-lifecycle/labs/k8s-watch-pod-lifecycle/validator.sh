#!/bin/bash
# validator.sh — k8s-pods / 05-pod-lifecycle / k8s-watch-pod-lifecycle
set -euo pipefail

FILE="$HOME/k8s-pods/init-status.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you save the status phase to it?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="Pending"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect status in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully verified pod lifecycle pending status!"
exit 0
