#!/bin/bash
# validator.sh — k8s-fundamentals / 03-installing-a-local-cluster / k8s-verify-cluster
set -euo pipefail

FILE="$HOME/k8s-fundamentals/node-name.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you write the node name to it?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="tld-k8s-verify-cluster-control-plane"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect node name in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully verified cluster access and retrieved the control-plane node name!"
exit 0
