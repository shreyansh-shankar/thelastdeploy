#!/bin/bash
# validator.sh — k8s-fundamentals / 03-installing-a-local-cluster / k8s-install-kind
set -euo pipefail

# 1. Check if kind is available
if ! command -v kind &>/dev/null; then
  echo "FAIL: kind command not found. Please install kind first."
  exit 1
fi

# 2. Check if kubectl is available
if ! command -v kubectl &>/dev/null; then
  echo "FAIL: kubectl command not found. Please install kubectl first."
  exit 1
fi

echo "PASS: Kind and Kubectl are successfully installed!"
exit 0
