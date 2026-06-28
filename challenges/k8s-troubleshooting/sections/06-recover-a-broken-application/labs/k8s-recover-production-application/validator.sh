#!/bin/bash
# validator.sh — k8s-troubleshooting / 06-recover-a-broken-application / k8s-recover-production-application
set -euo pipefail

CONTEXT="kind-tld-k8s-recover-production-application"
DEPLOY="frontend-deploy"
CM="frontend-config"

# 1. Check if ConfigMap exists
if ! kubectl --context="$CONTEXT" get configmap "$CM" &>/dev/null; then
  echo "FAIL: ConfigMap '$CM' not found. Did you create the missing dependency?"
  exit 1
fi

# 2. Check if deployment exists
if ! kubectl --context="$CONTEXT" get deployment "$DEPLOY" &>/dev/null; then
  echo "FAIL: Deployment '$DEPLOY' not found."
  exit 1
fi

# 3. Check image is no longer broken
IMAGE=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.spec.template.spec.containers[0].image}')
if [ "$IMAGE" = "nginx:1.9999.broken" ]; then
  echo "FAIL: Deployment still uses the broken image '$IMAGE'. Did you fix the image tag?"
  exit 1
fi

# 4. Check ready replicas
READY=$(kubectl --context="$CONTEXT" get deployment "$DEPLOY" -o jsonpath='{.status.readyReplicas}' 2>/dev/null || echo "0")
if [ -z "$READY" ] || [ "$READY" -lt 1 ]; then
  echo "FAIL: Deployment '$DEPLOY' has no ready pods. Is the application running?"
  exit 1
fi

echo "PASS: Production application successfully recovered! ConfigMap created, image fixed, and pod is running."
exit 0
