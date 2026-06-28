#!/bin/bash
# validator.sh — k8s-pods / 03-inspecting-pods / k8s-exec-into-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-exec-into-pod"

# 1. Check if pod is running
if ! kubectl --context="$CONTEXT" get pod exec-pod &>/dev/null; then
  echo "FAIL: Pod 'exec-pod' not found in default namespace."
  exit 1
fi

STATUS=$(kubectl --context="$CONTEXT" get pod exec-pod -o jsonpath='{.status.phase}')
if [ "$STATUS" != "Running" ]; then
  echo "FAIL: Pod 'exec-pod' is not in Running state (got: $STATUS)"
  exit 1
fi

# 2. Check if /tmp/hostname.txt exists inside the container and contains 'exec-pod'
CONTENT=$(kubectl --context="$CONTEXT" exec exec-pod -- cat /tmp/hostname.txt 2>/dev/null || echo "")

if [ -z "$CONTENT" ]; then
  echo "FAIL: /tmp/hostname.txt not found or empty inside the container."
  exit 1
fi

CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '[:space:]')
if [ "$CONTENT_CLEANED" != "exec-pod" ]; then
  echo "FAIL: /tmp/hostname.txt content is incorrect. Expected 'exec-pod', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully validated container execution and hostname entry!"
exit 0
