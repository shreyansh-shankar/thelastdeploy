#!/bin/bash
# validator.sh — k8s-pods / 05-pod-lifecycle / k8s-pod-restarts
set -euo pipefail

CONTEXT="kind-tld-k8s-pod-restarts"
FILE="$HOME/k8s-pods/restarts.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you observe and write the restart count?"
  exit 1
fi

USER_RESTARTS=$(tr -d '[:space:]' < "$FILE")

# Validate that USER_RESTARTS is a valid non-negative integer
if [[ ! "$USER_RESTARTS" =~ ^[0-9]+$ ]]; then
  echo "FAIL: Value in $FILE is not a valid integer: '$USER_RESTARTS'"
  exit 1
fi

if [ "$USER_RESTARTS" -lt 2 ]; then
  echo "FAIL: Restart count in $FILE must be at least 2 (got: '$USER_RESTARTS')"
  exit 1
fi

# Query actual restarts
ACTUAL_RESTARTS=$(kubectl --context="$CONTEXT" get pod restart-pod -o jsonpath='{.status.containerStatuses[0].restartCount}' 2>/dev/null || echo "0")

if [ -z "$ACTUAL_RESTARTS" ]; then
  ACTUAL_RESTARTS="0"
fi

if [ "$USER_RESTARTS" -gt "$ACTUAL_RESTARTS" ]; then
  echo "FAIL: You wrote '$USER_RESTARTS' restarts, but the actual restart count is '$ACTUAL_RESTARTS'. Please wait for restarts to increase."
  exit 1
fi

echo "PASS: Pod restarts successfully verified! (recorded: $USER_RESTARTS, actual: $ACTUAL_RESTARTS)"
exit 0
