#!/bin/bash
# validator.sh — k8s-fundamentals / 05-working-with-namespaces / k8s-switch-namespace
set -euo pipefail

CONTEXT="kind-tld-k8s-switch-namespace"

# Query the namespace currently active in the kubeconfig context
ACTIVE_NS=$(kubectl config view --minify --context="$CONTEXT" -o jsonpath='{..namespace}' 2>/dev/null || echo "")

if [ "$ACTIVE_NS" != "development" ]; then
  echo "FAIL: Active namespace for context '$CONTEXT' is '$ACTIVE_NS' (expected: 'development')."
  echo "Hint: Run 'kubectl config set-context --current --namespace=development'"
  exit 1
fi

echo "PASS: Successfully switched default context namespace to development!"
exit 0
