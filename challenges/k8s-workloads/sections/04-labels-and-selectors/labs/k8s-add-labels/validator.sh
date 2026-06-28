#!/bin/bash
# validator.sh — k8s-workloads / 04-labels-and-selectors / k8s-add-labels
set -euo pipefail

CONTEXT="kind-tld-k8s-add-labels"
POD="metadata-pod"

# 1. Check if pod exists
if ! kubectl --context="$CONTEXT" get pod "$POD" &>/dev/null; then
  echo "FAIL: Pod '$POD' not found in default namespace."
  exit 1
fi

# 2. Check if label is present
LABEL=$(kubectl --context="$CONTEXT" get pod "$POD" -o jsonpath='{.metadata.labels.environment}' 2>/dev/null || echo "")

if [ "$LABEL" != "production" ]; then
  echo "FAIL: Pod '$POD' does not have label 'environment=production' (got: '$LABEL')."
  exit 1
fi

echo "PASS: Label environment=production verified successfully on metadata-pod!"
exit 0
