#!/bin/bash
# validator.sh — k8s-workloads / 06-recover-a-broken-deployment / k8s-fix-broken-deployment
set -euo pipefail

CONTEXT="kind-tld-k8s-fix-broken-deployment"
DEPLOY="broken-deploy"

# 1. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found in default namespace."
  exit 1
fi

# 2. Check that the image is valid
IMAGE=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.template.spec.containers[0].image}')
if [ "$IMAGE" = "nginx:1.161.badtypo" ]; then
  echo "FAIL: Deployment is still running the broken image '$IMAGE'."
  exit 1
fi

# 3. Check ready replicas count
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}')
if [ -z "$READY" ] || [ "$READY" -ne 1 ]; then
  echo "FAIL: The fixed deployment is not ready or running yet."
  exit 1
fi

echo "PASS: Stuck deployment successfully recovered and is running!"
exit 0
