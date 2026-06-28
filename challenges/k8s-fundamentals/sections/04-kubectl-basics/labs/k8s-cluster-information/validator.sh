#!/bin/bash
# validator.sh — k8s-fundamentals / 04-kubectl-basics / k8s-cluster-information
set -euo pipefail

FILE="$HOME/k8s-fundamentals/kubernetes-cluster-ip.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you write the ClusterIP to it?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")
EXPECTED="10.96.0.1"

if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Incorrect ClusterIP in $FILE. Expected '$EXPECTED', got '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully verified cluster IP retrieval!"
exit 0
