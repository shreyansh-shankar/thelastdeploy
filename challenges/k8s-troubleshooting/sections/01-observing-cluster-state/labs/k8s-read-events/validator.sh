#!/bin/bash
# validator.sh — k8s-troubleshooting / 01-observing-cluster-state / k8s-read-events
set -euo pipefail

FILE="$HOME/k8s-troubleshooting/warning-reason.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query the warning events?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

if [ "$CONTENT" != "FailedScheduling" ]; then
  echo "FAIL: Incorrect warning reason in $FILE: '$CONTENT' (expected: FailedScheduling)."
  exit 1
fi

echo "PASS: Successfully retrieved and matched the warning reason!"
exit 0
