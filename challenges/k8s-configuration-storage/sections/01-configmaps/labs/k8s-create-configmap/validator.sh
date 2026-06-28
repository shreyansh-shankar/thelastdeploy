#!/bin/bash
# validator.sh — k8s-configuration-storage / 01-configmaps / k8s-create-configmap
set -euo pipefail

CONTEXT="kind-tld-k8s-create-configmap"
CM="app-config"

# 1. Check if configmap exists
if ! kubectl --context="$CONTEXT" get configmap "$CM" &>/dev/null; then
  echo "FAIL: ConfigMap '$CM' not found in default namespace."
  exit 1
fi

# 2. Check key and value
VAL=$(kubectl --context="$CONTEXT" get configmap "$CM" -o jsonpath='{.data.app\.environment}' 2>/dev/null || echo "")

if [ "$VAL" != "production" ]; then
  echo "FAIL: ConfigMap '$CM' does not contain key 'app.environment' with value 'production' (got: '$VAL')."
  exit 1
fi

echo "PASS: ConfigMap 'app-config' successfully verified!"
exit 0
