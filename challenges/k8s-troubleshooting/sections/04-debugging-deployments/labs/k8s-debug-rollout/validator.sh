#!/bin/bash
# validator.sh — k8s-troubleshooting / 04-debugging-deployments / k8s-debug-rollout
set -euo pipefail

FILE="$HOME/k8s-troubleshooting/bad-image.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you find the bad image tag name?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

if [ "$CONTENT" != "nginx:1.161.typo" ]; then
  echo "FAIL: Bad image tag name in $FILE is incorrect: '$CONTENT' (expected: nginx:1.161.typo)."
  exit 1
fi

echo "PASS: Successfully identified the stuck rollout image tag!"
exit 0
