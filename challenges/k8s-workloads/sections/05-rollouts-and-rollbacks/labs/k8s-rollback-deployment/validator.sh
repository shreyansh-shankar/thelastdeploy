#!/bin/bash
# validator.sh — k8s-workloads / 05-rollouts-and-rollbacks / k8s-rollback-deployment
set -euo pipefail

CONTEXT="kind-tld-k8s-rollback-deployment"
DEPLOY="rollout-deploy"

# 1. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found in default namespace."
  exit 1
fi

# 2. Check rolled back image configuration
IMAGE=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.template.spec.containers[0].image}')
if [ "$IMAGE" != "nginx:1.14.2" ]; then
  echo "FAIL: Deployment is running image '$IMAGE' (expected: nginx:1.14.2)."
  exit 1
fi

# 3. Check ready replicas
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}')
if [ -z "$READY" ] || [ "$READY" -ne 1 ]; then
  echo "FAIL: The rolled back pod is not ready yet."
  exit 1
fi

echo "PASS: Deployment rolled back to nginx:1.14.2 successfully!"
exit 0
