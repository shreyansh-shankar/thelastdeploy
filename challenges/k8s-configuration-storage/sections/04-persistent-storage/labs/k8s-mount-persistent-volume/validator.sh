#!/bin/bash
# validator.sh — k8s-configuration-storage / 04-persistent-storage / k8s-mount-persistent-volume
set -euo pipefail

CONTEXT="kind-tld-k8s-mount-persistent-volume"
POD="pv-pod"

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

# 2. Check if volume is specified referencing the PVC
VOL_NAME=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.volumes[?(@.persistentVolumeClaim.claimName=="task-pv-claim")].name}' 2>/dev/null || echo "")

if [ -z "$VOL_NAME" ]; then
  echo "FAIL: Pod '$POD' does not define a volume referencing PersistentVolumeClaim 'task-pv-claim'."
  exit 1
fi

# 3. Check if volume is mounted at /usr/share/nginx/html
MOUNT_PATH=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].volumeMounts[?(@.name=="'$VOL_NAME'")].mountPath}' 2>/dev/null || echo "")

if [ "$MOUNT_PATH" != "/usr/share/nginx/html" ] && [ "$MOUNT_PATH" != "/usr/share/nginx/html/" ]; then
  echo "FAIL: Volume '$VOL_NAME' is mounted at '$MOUNT_PATH' (expected: /usr/share/nginx/html)."
  exit 1
fi

echo "PASS: PVC dynamic storage volume mount successfully verified!"
exit 0
