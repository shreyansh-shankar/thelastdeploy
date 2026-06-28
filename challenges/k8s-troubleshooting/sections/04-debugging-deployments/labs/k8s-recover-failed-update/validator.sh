#!/bin/bash
# validator.sh — k8s-troubleshooting / 04-debugging-deployments / k8s-recover-failed-update
set -euo pipefail

CONTEXT="kind-tld-k8s-recover-failed-update"
DEPLOY="rollout-app"

# 1. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found in default namespace."
  exit 1
fi

# 2. Check updated image configuration
IMAGE=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.template.spec.containers[0].image}')
if [ "$IMAGE" != "nginx:1.16.1" ] && [ "$IMAGE" != "nginx" ]; then
  echo "FAIL: Deployment is running image '$IMAGE' (expected: nginx:1.16.1)."
  exit 1
fi

# 3. Check ready replicas count
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}')
if [ -z "$READY" ] || [ "$READY" -ne 1 ]; then
  echo "FAIL: Deployment is not running or ready yet."
  exit 1
fi

echo "PASS: Stuck deployment rollout successfully resolved and updated!"
exit 0
