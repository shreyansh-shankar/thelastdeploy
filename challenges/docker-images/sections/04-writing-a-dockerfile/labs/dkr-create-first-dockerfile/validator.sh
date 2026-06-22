#!/bin/bash
# validator.sh — docker-images / 04-writing-a-dockerfile / dkr-create-first-dockerfile
set -euo pipefail

DF_DIR="$HOME/docker-build/first-dockerfile"
DF_PATH="$DF_DIR/Dockerfile"

# 1. Check if Dockerfile exists
if [ ! -f "$DF_PATH" ]; then
  echo "FAIL: Dockerfile not found at '$DF_PATH'."
  exit 1
fi

# 2. Check if Dockerfile uses alpine:3.18 as base
if ! grep -qi "FROM[[:space:]]\+alpine:3.18" "$DF_PATH"; then
  echo "FAIL: Base image in Dockerfile is not alpine:3.18. Make sure to use 'FROM alpine:3.18'."
  exit 1
fi

# 3. Attempt to build the image
echo "Building the Dockerfile..."
if ! docker build -t test-first-df "$DF_DIR" > /tmp/build_first_df.log 2>&1; then
  echo "FAIL: Failed to build image. Build logs:"
  cat /tmp/build_first_df.log
  exit 1
fi

# 4. Check if APP_COLOR env var is blue
if ! docker inspect -f '{{json .Config.Env}}' test-first-df | grep -q "APP_COLOR=blue"; then
  echo "FAIL: Environment variable APP_COLOR is not set to 'blue'."
  exit 1
fi

# 5. Check if running the container prints "Hello DevLab"
OUTPUT=$(docker run --rm test-first-df 2>/dev/null || echo "")
OUTPUT_CLEANED=$(echo "$OUTPUT" | tr -d '\r' | xargs)

if [ "$OUTPUT_CLEANED" != "Hello DevLab" ]; then
  echo "FAIL: Container did not print 'Hello DevLab' on start. Got: '$OUTPUT_CLEANED'"
  exit 1
fi

echo "PASS: Successfully created and verified first Dockerfile."
exit 0
