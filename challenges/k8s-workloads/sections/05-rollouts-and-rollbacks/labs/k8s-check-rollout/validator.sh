#!/bin/bash
# validator.sh — k8s-workloads / 05-rollouts-and-rollbacks / k8s-check-rollout
set -euo pipefail

FILE="$HOME/k8s-workloads/rollout-status.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you check the rollout status?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

if [[ "$CONTENT" != *"successfullyrolledout"* ]]; then
  echo "FAIL: Incorrect rollout status message in $FILE. Expected 'successfully rolled out', got '$CONTENT'"
  exit 1
fi

echo "PASS: Rollout status message verified successfully!"
exit 0
