#!/bin/bash
# validator.sh — k8s-fundamentals / 04-kubectl-basics / k8s-describe-resource
set -euo pipefail

FILE="$HOME/k8s-fundamentals/web-tier-label.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you find the tier label?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="web"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect value in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully retrieved the tier label of web-server pod!"
exit 0
