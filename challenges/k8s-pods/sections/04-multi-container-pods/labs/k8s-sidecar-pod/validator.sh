#!/bin/bash
# validator.sh — k8s-pods / 04-multi-container-pods / k8s-sidecar-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-sidecar-pod"
POD="multi-container-pod"

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

# 2. Check container names
CONTAINERS=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[*].name}')
if [[ "$CONTAINERS" != *"app"* ]] || [[ "$CONTAINERS" != *"sidecar"* ]]; then
  echo "FAIL: Pod must contain two containers named 'app' and 'sidecar' (got: '$CONTAINERS')."
  exit 1
fi

# 3. Check shared emptyDir volume
VOLUMES=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.volumes[*].emptyDir}')
if [ -z "$VOLUMES" ]; then
  echo "FAIL: Pod does not define any emptyDir volumes for log sharing."
  exit 1
fi

# 4. Check that both containers mount the shared volume
APP_MOUNTS=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[?(@.name=="app")].volumeMounts[*].name}')
SIDECAR_MOUNTS=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[?(@.name=="sidecar")].volumeMounts[*].name}')

if [ -z "$APP_MOUNTS" ] || [ -z "$SIDECAR_MOUNTS" ]; then
  echo "FAIL: Both containers must mount the shared volume."
  exit 1
fi

# Verify they share at least one volume with the same name
SHARED_VOL=""
for av in $APP_MOUNTS; do
  for sv in $SIDECAR_MOUNTS; do
    if [ "$av" = "$sv" ]; then
      SHARED_VOL="$av"
      break
    fi
  done
  if [ -n "$SHARED_VOL" ]; then
    break
  fi
done

if [ -z "$SHARED_VOL" ]; then
  echo "FAIL: Containers do not share a common mounted volume (app mounts: '$APP_MOUNTS', sidecar mounts: '$SIDECAR_MOUNTS')."
  exit 1
fi

echo "PASS: Multi-container sidecar pod successfully verified!"
exit 0
