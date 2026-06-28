#!/bin/bash
# validator.sh — k8s-pods / 06-debug-a-failed-pod / k8s-debug-failed-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-debug-failed-pod"
POD="failing-image-pod"

# 1. Check if pod exists
if ! kubectl --context="$CONTEXT" get pod "$POD" &>/dev/null; then
  echo "FAIL: Pod '$POD' not found in default namespace."
  exit 1
fi

# 2. Check if pod is running
PHASE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.phase}')
if [ "$PHASE" != "Running" ]; then
  echo "FAIL: Pod '$POD' status is '$PHASE' (expected: Running)."
  exit 1
fi

# 3. Check if image is correct
IMAGE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].image}')
if [ "$IMAGE" != "nginx" ] && [ "$IMAGE" != "nginx:latest" ]; then
  echo "FAIL: Pod '$POD' is running but uses incorrect image '$IMAGE' (expected: nginx)"
  exit 1
fi

echo "PASS: Successfully debugged and running pod with correct image!"
exit 0
