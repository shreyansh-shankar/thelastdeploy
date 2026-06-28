#!/bin/bash
# validator.sh — k8s-pods / 02-creating-pods / k8s-delete-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-delete-pod"

# Check if pod exists
if kubectl --context="$CONTEXT" get pod dynamic-pod &>/dev/null; then
  echo "FAIL: Pod 'dynamic-pod' still exists in default namespace. Did you delete it?"
  exit 1
fi

echo "PASS: Pod 'dynamic-pod' successfully deleted!"
exit 0
