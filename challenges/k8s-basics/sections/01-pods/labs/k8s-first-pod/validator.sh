#!/bin/bash
# validator.sh — k8s-basics / 01-pods / k8s-first-pod
set -euo pipefail

CONTEXT="kind-tld-k8s-first-pod"

# 1. Check if kubectl is available
if ! command -v kubectl &>/dev/null; then
  echo "FAIL: kubectl command not found — is kubectl installed?"
  exit 1
fi

# 2. Check if cluster/context is reachable
if ! kubectl cluster-info --context="$CONTEXT" &>/dev/null; then
  echo "FAIL: Kind cluster '$CONTEXT' is not reachable — did you start the lab?"
  exit 1
fi

# 3. Check if nginx-pod exists
if ! kubectl --context="$CONTEXT" get pod nginx-pod &>/dev/null; then
  echo "FAIL: Pod 'nginx-pod' not found in the default namespace. Did you run 'kubectl run nginx-pod --image=nginx'?"
  exit 1
fi

# 4. Check if nginx-pod is Running
STATUS=$(kubectl --context="$CONTEXT" get pod nginx-pod -o jsonpath='{.status.phase}')
if [ "$STATUS" != "Running" ]; then
  echo "FAIL: Pod 'nginx-pod' exists but status is '$STATUS' (expected: Running)"
  exit 1
fi

# 5. Check if pod uses nginx image
IMAGE=$(kubectl --context="$CONTEXT" get pod nginx-pod -o jsonpath='{.spec.containers[0].image}')
if [[ "$IMAGE" != *"nginx"* ]]; then
  echo "FAIL: Pod 'nginx-pod' is running but does not use an nginx image (got: '$IMAGE')"
  exit 1
fi

echo "PASS: Kubernetes Kind cluster is running and nginx-pod is successfully deployed and Running"
exit 0
