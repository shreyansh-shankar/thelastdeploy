#!/bin/bash
# validator.sh — k8s-pods / 03-inspecting-pods / k8s-inspect-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-inspect-pod"
FILE="$HOME/k8s-pods/pod-ip.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you query and write the IP?"
  exit 1
fi

USER_IP=$(tr -d '[:space:]' < "$FILE")

# Query actual Pod IP
ACTUAL_IP=$(kubectl --context="$CONTEXT" get pod test-pod -o jsonpath='{.status.podIP}' 2>/dev/null || echo "")

if [ -z "$ACTUAL_IP" ]; then
  echo "FAIL: Could not query actual IP of 'test-pod'. Is it running?"
  exit 1
fi

if [ "$USER_IP" != "$ACTUAL_IP" ]; then
  echo "FAIL: Incorrect IP in $FILE. Expected '$ACTUAL_IP', got '$USER_IP'"
  exit 1
fi

echo "PASS: Pod IP successfully verified!"
exit 0
