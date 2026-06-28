#!/bin/bash
# validator.sh — k8s-workloads / 04-labels-and-selectors / k8s-selector-match
set -euo pipefail

FILE="$HOME/k8s-workloads/selector.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you write the selector query?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

# The content can be either 'tier=frontend,app=store' or 'app=store,tier=frontend'
if [ "$CONTENT" != "tier=frontend,app=store" ] && [ "$CONTENT" != "app=store,tier=frontend" ]; then
  echo "FAIL: Selector query in $FILE is incorrect: '$CONTENT'."
  echo "Expected 'tier=frontend,app=store' or 'app=store,tier=frontend'"
  exit 1
fi

echo "PASS: Selector match query verified successfully!"
exit 0
