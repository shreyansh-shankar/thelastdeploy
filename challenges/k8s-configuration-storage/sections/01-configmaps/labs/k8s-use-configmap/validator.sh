#!/bin/bash
# validator.sh — k8s-configuration-storage / 01-configmaps / k8s-use-configmap
set -euo pipefail

CONTEXT="kind-tld-k8s-use-configmap"
POD="config-explorer"

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

# 3. Check environment variables mapping
# Get env vars block
ENV_VARS=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].env}')

if [[ "$ENV_VARS" != *"APP_ENV"* ]]; then
  echo "FAIL: Pod '$POD' container does not define environment variable 'APP_ENV'."
  exit 1
fi

# Check value source reference
CONFIG_KEY=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].env[?(@.name=="APP_ENV")].valueFrom.configMapKeyRef.key}' 2>/dev/null || echo "")
CONFIG_NAME=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.spec.containers[0].env[?(@.name=="APP_ENV")].valueFrom.configMapKeyRef.name}' 2>/dev/null || echo "")

if [ "$CONFIG_NAME" != "app-config" ] || [ "$CONFIG_KEY" != "app.environment" ]; then
  echo "FAIL: Environment variable 'APP_ENV' is not correctly mapped from ConfigMap 'app-config' key 'app.environment' (got: name='$CONFIG_NAME', key='$CONFIG_KEY')."
  exit 1
fi

echo "PASS: ConfigMap environment variable injection verified successfully!"
exit 0
