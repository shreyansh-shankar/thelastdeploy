#!/bin/bash
# validator.sh — k8s-workloads / 04-labels-and-selectors / k8s-query-by-label
set -euo pipefail

FILE="$HOME/k8s-workloads/backend-pods.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query and write the backend pod names?"
  exit 1
fi

CONTENT=$(grep -v '^[[:space:]]*$' "$FILE" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | sort)

EXPECTED=$(cat <<EOF
pod1
pod2
EOF
)

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Query results in $FILE are incorrect. Expected:"
  echo "$EXPECTED"
  echo "Got:"
  echo "$CONTENT"
  exit 1
fi

echo "PASS: Successfully queried and verified backend pods list!"
exit 0
