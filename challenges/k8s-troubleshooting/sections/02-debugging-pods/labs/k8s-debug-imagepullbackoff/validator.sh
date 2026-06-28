#!/bin/bash
# validator.sh — k8s-troubleshooting / 02-debugging-pods / k8s-debug-imagepullbackoff
set -euo pipefail

CONTEXT="kind-tld-k8s-debug-imagepullbackoff"
POD="pull-failed-pod"

# 1. Check if pod exists
if ! kubectl --context="$CONTEXT" get pod "$POD" &>/dev/null; then
  echo "FAIL: Pod '$POD' not found in default namespace."
  exit 1
fi

# 2. Check updated image configuration
IMAGE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].image}')
if [ "$IMAGE" != "nginx" ] && [ "$IMAGE" != "nginx:latest" ]; then
  echo "FAIL: Pod is running image '$IMAGE' (expected: nginx)."
  exit 1
fi

# 3. Check ready status
PHASE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.phase}')
if [ "$PHASE" != "Running" ]; then
  echo "FAIL: Pod '$POD' status is '$PHASE' (expected: Running)."
  exit 1
fi

echo "PASS: ImagePullBackOff resolved successfully! Pod is running."
exit 0
