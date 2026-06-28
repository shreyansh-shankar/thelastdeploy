#!/bin/bash
# validator.sh — k8s-troubleshooting / 03-debugging-services / k8s-fix-selector-mismatch
set -euo pipefail

CONTEXT="kind-tld-k8s-fix-selector-mismatch"
SVC="web-service"

# 1. Check if service exists
if ! kubectl --context="$CONTEXT" get service "$SVC" &>/dev/null; then
  echo "FAIL: Service '$SVC' not found in default namespace."
  exit 1
fi

# 2. Check if endpoints are active
ENDPOINTS=$(kubectl --context="$CONTEXT" get endpoints "$SVC" -o jsonpath='{.subsets[0].addresses[0].ip}' 2>/dev/null || echo "")

if [ -z "$ENDPOINTS" ]; then
  echo "FAIL: Service '$SVC' still does not target any active Pod endpoints."
  exit 1
fi

# 3. Check service selector keys
SELECTOR_KEY=$(kubectl --context="$CONTEXT" get service "$SVC" -o jsonpath='{.spec.selector.app}' 2>/dev/null || echo "")

if [ "$SELECTOR_KEY" != "web" ]; then
  echo "FAIL: Service '$SVC' selector 'app' is '$SELECTOR_KEY' (expected: web)."
  exit 1
fi

echo "PASS: Service selector mismatch fixed successfully!"
exit 0
