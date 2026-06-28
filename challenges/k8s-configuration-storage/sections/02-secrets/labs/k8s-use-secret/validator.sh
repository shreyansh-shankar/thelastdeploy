#!/bin/bash
# validator.sh — k8s-configuration-storage / 02-secrets / k8s-use-secret
set -euo pipefail

CONTEXT="kind-tld-k8s-use-secret"
POD="secret-explorer"

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

# 2. Check if volume is specified in pod spec
VOL_NAME=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.volumes[?(@.secret.secretName=="db-secret")].name}' 2>/dev/null || echo "")

if [ -z "$VOL_NAME" ]; then
  echo "FAIL: Pod '$POD' does not define a volume referencing secret 'db-secret'."
  exit 1
fi

# 3. Check if volume is mounted in the container at /etc/db
MOUNT_PATH=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath="{.spec.containers[0].volumeMounts[?(@.name==\"$VOL_NAME\")].mountPath}" 2>/dev/null || echo "")

if [ "$MOUNT_PATH" != "/etc/db" ] && [ "$MOUNT_PATH" != "/etc/db/" ]; then
  echo "FAIL: Volume '$VOL_NAME' is mounted at '$MOUNT_PATH' (expected: /etc/db)."
  exit 1
fi

# 4. Exec inside the pod to verify the file content
VAL=$(kubectl --context="$CONTEXT" exec "$POD" -- cat /etc/db/password 2>/dev/null || echo "")

if [ -z "$VAL" ]; then
  echo "FAIL: File /etc/db/password not found or empty inside container."
  exit 1
fi

if [ "$VAL" != "supersecret" ]; then
  echo "FAIL: /etc/db/password content is incorrect. Expected 'supersecret', got '$VAL'."
  exit 1
fi

echo "PASS: Secret volume mount verified successfully!"
exit 0
