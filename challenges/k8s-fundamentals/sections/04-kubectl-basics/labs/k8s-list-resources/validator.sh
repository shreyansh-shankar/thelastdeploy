#!/bin/bash
# validator.sh — k8s-fundamentals / 04-kubectl-basics / k8s-list-resources
set -euo pipefail

FILE="$HOME/k8s-fundamentals/pods-list.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you save the sorted list of pods to it?"
  exit 1
fi

# Read lines, trim them, sort, remove empty lines
CONTENT=$(grep -v '^[[:space:]]*$' "$FILE" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | sort)

EXPECTED=$(cat <<EOF
backend
database
frontend
EOF
)

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Pod list in $FILE is incorrect or not properly sorted. Expected:"
  echo "$EXPECTED"
  echo "Got:"
  echo "$CONTENT"
  exit 1
fi

echo "PASS: Successfully listed and verified sorted pod list!"
exit 0
