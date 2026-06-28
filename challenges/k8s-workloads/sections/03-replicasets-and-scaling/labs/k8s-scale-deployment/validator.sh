#!/bin/bash
# validator.sh — k8s-workloads / 03-replicasets-and-scaling / k8s-scale-deployment
set -euo pipefail

CONTEXT="kind-tld-k8s-scale-deployment"
DEPLOY="web-deploy"

# 1. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found in default namespace."
  exit 1
fi

# 2. Check replicas count configuration
REPLICAS=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.replicas}')
if [ "$REPLICAS" -ne 5 ]; then
  echo "FAIL: Deployment '$DEPLOY' configured replicas count is '$REPLICAS' (expected: 5)."
  exit 1
fi

# 3. Check ready replicas count
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}')
if [ -z "$READY" ] || [ "$READY" -ne 5 ]; then
  echo "FAIL: Not all scaled replicas are ready yet. Ready: '$READY'/5."
  exit 1
fi

echo "PASS: Deployment 'web-deploy' successfully scaled to 5 running replicas!"
exit 0
