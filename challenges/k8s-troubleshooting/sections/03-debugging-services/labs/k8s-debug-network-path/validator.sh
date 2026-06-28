#!/bin/bash
# validator.sh — k8s-troubleshooting / 03-debugging-services / k8s-debug-network-path
set -euo pipefail

CONTEXT="kind-tld-k8s-debug-network-path"
POD="web-pod"
FILE="$HOME/k8s-troubleshooting/endpoints.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query the endpoint IP address?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

# Query actual IP dynamically
EXPECTED=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.podIP}' 2>/dev/null || echo "")

if [ -z "$EXPECTED" ]; then
  echo "FAIL: Could not query pod IP dynamically (pod not scheduled yet or running)."
  exit 1
fi

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Endpoint IP in $FILE is '$CONTENT' (expected: '$EXPECTED')."
  exit 1
fi

echo "PASS: Service endpoint network path verified successfully!"
exit 0
