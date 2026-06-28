#!/bin/bash
# validator.sh — k8s-troubleshooting / 02-debugging-pods / k8s-debug-crashloopbackoff
set -euo pipefail

FILE="$HOME/k8s-troubleshooting/crash-code.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you check the crashed container logs?"
  exit 1
fi

CONTENT=$(tr -d '[:space:]' < "$FILE")

if [ "$CONTENT" != "FATAL_ERROR_CODE_9876" ]; then
  echo "FAIL: Incorrect error code in $FILE: '$CONTENT' (expected: FATAL_ERROR_CODE_9876)."
  exit 1
fi

echo "PASS: Successfully identified the crashed error code from pod logs!"
exit 0
