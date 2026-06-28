#!/bin/bash
# validator.sh — k8s-fundamentals / 05-working-with-namespaces / k8s-create-namespace
set -euo pipefail

CONTEXT="kind-tld-k8s-create-namespace"

if ! kubectl --context="$CONTEXT" get namespace production &>/dev/null; then
  echo "FAIL: Namespace 'production' not found in the cluster."
  exit 1
fi

echo "PASS: Namespace 'production' created successfully!"
exit 0
