#!/bin/bash
# validator.sh — k8s-configuration-storage / 04-persistent-storage / k8s-create-pvc
set -euo pipefail

CONTEXT="kind-tld-k8s-create-pvc"
PVC="task-pv-claim"

# 1. Check if PVC exists
if ! kubectl --context="$CONTEXT" get pvc "$PVC" &>/dev/null; then
  echo "FAIL: PVC '$PVC' not found in default namespace."
  exit 1
fi

# 2. Check access mode
MODE=$(kubectl --context="$CONTEXT" get pvc "$PVC" -o jsonpath='{.spec.accessModes[0]}')
if [ "$MODE" != "ReadWriteOnce" ]; then
  echo "FAIL: PVC '$PVC' access mode is '$MODE' (expected: ReadWriteOnce)."
  exit 1
fi

# 3. Check requested storage capacity
STORAGE=$(kubectl --context="$CONTEXT" get pvc "$PVC" -o jsonpath='{.spec.resources.requests.storage}')
if [ "$STORAGE" != "1Gi" ]; then
  echo "FAIL: PVC '$PVC' requested storage is '$STORAGE' (expected: 1Gi)."
  exit 1
fi

echo "PASS: PersistentVolumeClaim 'task-pv-claim' successfully verified!"
exit 0
