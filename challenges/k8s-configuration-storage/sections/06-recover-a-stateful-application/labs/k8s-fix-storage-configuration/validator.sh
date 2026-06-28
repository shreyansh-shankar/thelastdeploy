#!/bin/bash
# validator.sh — k8s-configuration-storage / 06-recover-a-stateful-application / k8s-fix-storage-configuration
set -euo pipefail

CONTEXT="kind-tld-k8s-fix-storage-configuration"
POD="db-pod"
PVC="non-existent-claim"

# 1. Check if PVC exists
if ! kubectl --context="$CONTEXT" get pvc "$PVC" &>/dev/null; then
  echo "FAIL: PersistentVolumeClaim '$PVC' not found in default namespace."
  exit 1
fi

# 2. Check PVC properties
MODE=$(kubectl --context="$CONTEXT" get pvc "$PVC" -o jsonpath='{.spec.accessModes[0]}' 2>/dev/null || echo "")
if [ "$MODE" != "ReadWriteOnce" ]; then
  echo "FAIL: PVC '$PVC' access mode is '$MODE' (expected: ReadWriteOnce)."
  exit 1
fi

STORAGE=$(kubectl --context="$CONTEXT" get pvc "$PVC" -o jsonpath='{.spec.resources.requests.storage}' 2>/dev/null || echo "")
if [ "$STORAGE" != "1Gi" ]; then
  echo "FAIL: PVC '$PVC' requested capacity is '$STORAGE' (expected: 1Gi)."
  exit 1
fi

# 3. Check if pod is running now
PHASE=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.status.phase}')
if [ "$PHASE" != "Running" ]; then
  echo "FAIL: Pod '$POD' status is '$PHASE' (expected: Running)."
  exit 1
fi

echo "PASS: Storage configuration fixed and db-pod successfully mounted and running!"
exit 0
