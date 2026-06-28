#!/bin/bash
# validator.sh — k8s-fundamentals / 07-investigate-your-cluster / k8s-cluster-investigation
set -euo pipefail

FILE="$HOME/k8s-fundamentals/crash-code.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you find the error code in the logs?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="ERROR_CODE_7712"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect error code in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully investigated cluster failure and retrieved the crash error code!"
exit 0
