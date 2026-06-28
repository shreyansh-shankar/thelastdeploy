#!/bin/bash
# validator.sh — k8s-configuration-storage / 02-secrets / k8s-create-secret
set -euo pipefail

CONTEXT="kind-tld-k8s-create-secret"
SECRET="db-secret"

# 1. Check if secret exists
if ! kubectl --context="$CONTEXT" get secret "$SECRET" &>/dev/null; then
  echo "FAIL: Secret '$SECRET' not found in default namespace."
  exit 1
fi

# 2. Check key and value
VAL_B64=$(kubectl --context="$CONTEXT" get secret "$SECRET" -o jsonpath='{.data.password}' 2>/dev/null || echo "")

if [ -z "$VAL_B64" ]; then
  echo "FAIL: Secret '$SECRET' does not contain key 'password'."
  exit 1
fi

VAL=$(echo "$VAL_B64" | base64 -d)

if [ "$VAL" != "supersecret" ]; then
  echo "FAIL: Secret '$SECRET' key 'password' value is incorrect (decoded: '$VAL')."
  exit 1
fi

echo "PASS: Secret 'db-secret' successfully verified!"
exit 0
