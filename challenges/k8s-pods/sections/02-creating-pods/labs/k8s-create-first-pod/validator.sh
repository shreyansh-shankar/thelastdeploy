#!/bin/bash
# validator.sh — k8s-pods / 02-creating-pods / k8s-create-first-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-create-first-pod"

# 1. Check if pod exists
if ! kubectl --context="$CONTEXT" get pod nginx-pod &>/dev/null; then
  echo "FAIL: Pod 'nginx-pod' not found in default namespace."
  exit 1
fi

# 2. Check if pod is running
STATUS=$(kubectl --context="$CONTEXT" get pod nginx-pod -o jsonpath='{.status.phase}')
if [ "$STATUS" != "Running" ]; then
  echo "FAIL: Pod 'nginx-pod' exists but status is '$STATUS' (expected: Running)"
  exit 1
fi

# 3. Check image
IMAGE=$(kubectl --context="$CONTEXT" get pod nginx-pod -o jsonpath='{.spec.containers[0].image}')
if [[ "$IMAGE" != *"nginx"* ]]; then
  echo "FAIL: Pod 'nginx-pod' is running but does not use an nginx image (got: '$IMAGE')"
  exit 1
fi

echo "PASS: Successfully created and running nginx-pod!"
exit 0
