#!/bin/bash
# validator.sh — k8s-fundamentals / 06-cluster-introspection / k8s-explore-cluster
set -euo pipefail

CONTEXT="kind-tld-k8s-explore-cluster"
FILE="$HOME/k8s-fundamentals/app-service-ip.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you find and write the service IP?"
  exit 1
fi

USER_IP=$(tr -d '[:space:]' < "$FILE")

# Dynamically query the actual IP of app-service in the cluster
ACTUAL_IP=$(kubectl --context="$CONTEXT" get svc app-service -n app-space -o jsonpath='{.spec.clusterIP}' 2>/dev/null || echo "")

if [ -z "$ACTUAL_IP" ]; then
  echo "FAIL: Could not query the actual ClusterIP of 'app-service' in namespace 'app-space'. Is the cluster running?"
  exit 1
fi

if [ "$USER_IP" != "$ACTUAL_IP" ]; then
  echo "FAIL: Incorrect IP in $FILE. Expected '$ACTUAL_IP', got '$USER_IP'"
  exit 1
fi

echo "PASS: Service ClusterIP successfully validated!"
exit 0
