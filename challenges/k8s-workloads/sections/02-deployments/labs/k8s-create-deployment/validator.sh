#!/bin/bash
# validator.sh — k8s-workloads / 02-deployments / k8s-create-deployment
set -euo pipefail

CONTEXT="kind-tld-k8s-create-deployment"
DEPLOY="nginx-deployment"

# 1. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found in default namespace."
  exit 1
fi

# 2. Check replicas count configuration
REPLICAS=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.replicas}')
if [ "$REPLICAS" -ne 3 ]; then
  echo "FAIL: Deployment '$DEPLOY' configured replicas count is '$REPLICAS' (expected: 3)."
  exit 1
fi

# 3. Check image configuration
IMAGE=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.template.spec.containers[0].image}')
if [ "$IMAGE" != "nginx:1.14.2" ]; then
  echo "FAIL: Deployment is running image '$IMAGE' (expected: nginx:1.14.2)."
  exit 1
fi

# 4. Check that pods are ready/running
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}')
if [ -z "$READY" ] || [ "$READY" -ne 3 ]; then
  echo "FAIL: Not all replicas are ready. Ready: '$READY'/3."
  exit 1
fi

echo "PASS: Deployment 'nginx-deployment' successfully created with 3 running replicas!"
exit 0
