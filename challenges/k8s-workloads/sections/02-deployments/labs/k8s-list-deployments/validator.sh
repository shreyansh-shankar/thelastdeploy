#!/bin/bash
# validator.sh — k8s-workloads / 02-deployments / k8s-list-deployments
set -euo pipefail

CONTEXT="kind-tld-k8s-list-deployments"
FILE="$HOME/k8s-workloads/deployments-count.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query and write the deployments count?"
  exit 1
fi

USER_COUNT=$(tr -d '[:space:]' < "$FILE")

# Validate it is an integer
if [[ ! "$USER_COUNT" =~ ^[0-9]+$ ]]; then
  echo "FAIL: Value in $FILE is not a valid integer: '$USER_COUNT'"
  exit 1
fi

# Dynamically count deployments across all namespaces
ACTUAL_COUNT=$(kubectl --context="$CONTEXT" get deployments -A --no-headers | wc -l | tr -d '[:space:]')

if [ "$USER_COUNT" -ne "$ACTUAL_COUNT" ]; then
  echo "FAIL: Count in $FILE is '$USER_COUNT', but the actual deployments count across all namespaces is '$ACTUAL_COUNT'."
  exit 1
fi

echo "PASS: Deployments count successfully verified!"
exit 0
