#!/bin/bash
# validator.sh — docker-fundamentals / 03-your-first-container / dkr-run-alpine-container
set -euo pipefail

# Check if the container my-alpine-run exists (even if stopped/exited)
if ! docker ps -a --filter name=my-alpine-run --format '{{.Names}}' | grep -q "my-alpine-run"; then
  echo "FAIL: Container 'my-alpine-run' not found. Make sure you run it with --name my-alpine-run."
  exit 1
fi

# Get container logs
LOGS=$(docker logs my-alpine-run 2>&1 | tr -d '\r\n' | xargs)

if [ "$LOGS" != "Hello from Alpine" ]; then
  echo "FAIL: Container output is incorrect. Expected 'Hello from Alpine', got: '$LOGS'"
  exit 1
fi

echo "PASS: Alpine container ran and outputted correctly."
exit 0
