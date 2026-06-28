#!/bin/bash
# validator.sh — k8s-troubleshooting / 01-observing-cluster-state / k8s-investigate-resources
set -euo pipefail

CONTEXT="kind-tld-k8s-investigate-resources"
FILE="$HOME/k8s-troubleshooting/kube-system-pods.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query and write the system pod names?"
  exit 1
fi

USER_CONTENT=$(grep -v '^[[:space:]]*$' "$FILE" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | sort)

# Dynamically query the actual pods from kube-system namespace
EXPECTED=$(kubectl --context="$CONTEXT" get pods -n kube-system -o jsonpath='{.items[*].metadata.name}' | tr ' ' '\n' | sort)

if [ "$USER_CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: System pod names list in $FILE does not match the actual pods list. Expected:"
  echo "$EXPECTED"
  echo "Got:"
  echo "$USER_CONTENT"
  exit 1
fi

echo "PASS: Successfully queried and matched system pods!"
exit 0
