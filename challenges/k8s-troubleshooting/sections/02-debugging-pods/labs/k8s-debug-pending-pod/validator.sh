#!/bin/bash
# validator.sh — k8s-troubleshooting / 02-debugging-pods / k8s-debug-pending-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-debug-pending-pod"
POD="pending-pod"

# 1. Check if pod exists
if ! kubectl --context="$CONTEXT" get pod "$POD" &>/dev/null; then
  echo "FAIL: Pod '$POD' not found in default namespace."
  exit 1
fi

# 2. Check if pod scheduled and is running
PHASE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.phase}')
if [ "$PHASE" != "Running" ]; then
  echo "FAIL: Pod '$POD' status is '$PHASE' (expected: Running)."
  exit 1
fi

# 3. Check requested resource CPU limits/requests
CPU=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].resources.requests.cpu}' 2>/dev/null || echo "")

if [ -n "$CPU" ]; then
  # CPU can be format like '0.1', '100m', '1', etc.
  # Let's parse it. If it contains 'm', convert it to numeric millicores, otherwise mult by 1000.
  if [[ "$CPU" == *m ]]; then
    NUM=${CPU%m}
  else
    # Check if CPU is float or integer
    # bash doesn't support float multiplication directly. Let's use awk or python.
    NUM=$(awk -v cpu="$CPU" 'BEGIN {print (cpu * 1000)}')
  fi

  # Cast float to integer
  INT_NUM=${NUM%.*}

  if [ "$INT_NUM" -gt 1000 ]; then
    echo "FAIL: Pod '$POD' requested CPU size is still too large: '$CPU' (expected: <= 1 CPU)."
    exit 1
  fi
fi

echo "PASS: Pending pod scheduling error resolved successfully!"
exit 0
