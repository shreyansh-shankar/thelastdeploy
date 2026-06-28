#!/bin/bash
# validator.sh — k8s-configuration-storage / 03-volumes / k8s-emptydir-volume
set -euo pipefail

CONTEXT="kind-tld-k8s-emptydir-volume"
POD="temp-data-pod"

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

# 2. Check if there is an emptyDir volume in pod spec
VOL_NAME=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.volumes[?(@.emptyDir)].name}' 2>/dev/null || echo "")

if [ -z "$VOL_NAME" ]; then
  echo "FAIL: Pod '$POD' does not define any emptyDir volumes."
  exit 1
fi

# 3. Check if volume is mounted in the container 'main' at /tmp/data
MOUNT_PATH=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[?(@.name=="main")].volumeMounts[?(@.name=="'$VOL_NAME'")].mountPath}' 2>/dev/null || echo "")

if [ "$MOUNT_PATH" != "/tmp/data" ] && [ "$MOUNT_PATH" != "/tmp/data/" ]; then
  echo "FAIL: Volume '$VOL_NAME' is mounted in container 'main' at '$MOUNT_PATH' (expected: /tmp/data)."
  exit 1
fi

echo "PASS: Transient emptyDir volume successfully verified!"
exit 0
