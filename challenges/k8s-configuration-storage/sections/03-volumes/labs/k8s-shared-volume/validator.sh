#!/bin/bash
# validator.sh — k8s-configuration-storage / 03-volumes / k8s-shared-volume
set -euo pipefail

CONTEXT="kind-tld-k8s-shared-volume"
POD="sharing-pod"

# 1. Check if pod exists and is running
if ! kubectl --context="$CONTEXT" get pod "$POD" &>/dev/null; then
  echo "FAIL: Pod '$POD' not found in default namespace."
  exit 1
fi

PHASE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.phase}')
if [ "$PHASE" != "Running" ]; then
  echo "FAIL: Pod '$POD' status is '$PHASE' (expected: Running)."
  exit 1
fi

# 2. Check that there are two containers named reader and writer
CONTAINERS=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[*].name}')

if [[ "$CONTAINERS" != *"reader"* ]] || [[ "$CONTAINERS" != *"writer"* ]]; then
  echo "FAIL: Pod must contain two containers named 'reader' and 'writer' (got: '$CONTAINERS')."
  exit 1
fi

# 3. Check shared emptyDir volume definition
VOL_NAME=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.volumes[?(@.emptyDir)].name}' 2>/dev/null || echo "")

if [ -z "$VOL_NAME" ]; then
  echo "FAIL: Pod does not define any emptyDir volumes for storage sharing."
  exit 1
fi

# 4. Check that both containers mount the volume at /shared
R_PATH=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[?(@.name=="reader")].volumeMounts[?(@.name=="'$VOL_NAME'")].mountPath}' 2>/dev/null || echo "")
W_PATH=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[?(@.name=="writer")].volumeMounts[?(@.name=="'$VOL_NAME'")].mountPath}' 2>/dev/null || echo "")

if [ "$R_PATH" != "/shared" ] && [ "$R_PATH" != "/shared/" ]; then
  echo "FAIL: 'reader' container does not mount the shared volume at /shared (got: '$R_PATH')."
  exit 1
fi

if [ "$W_PATH" != "/shared" ] && [ "$W_PATH" != "/shared/" ]; then
  echo "FAIL: 'writer' container does not mount the shared volume at /shared (got: '$W_PATH')."
  exit 1
fi

# 5. Check if /shared/message.txt contains content
VAL=$(kubectl --context="$CONTEXT" exec "$POD" -c reader -- cat /shared/message.txt 2>/dev/null || echo "")

if [ -z "$VAL" ]; then
  echo "FAIL: File /shared/message.txt not found or empty inside the reader container."
  exit 1
fi

echo "PASS: Multi-container emptyDir shared volume successfully verified!"
exit 0
