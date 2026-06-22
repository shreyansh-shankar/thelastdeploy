#!/bin/bash
# validator.sh — docker-images / 04-writing-a-dockerfile / dkr-fix-broken-dockerfile
set -euo pipefail

DF_DIR="$HOME/docker-build/broken-dockerfile"
DF_PATH="$DF_DIR/Dockerfile"

# 1. Check if Dockerfile exists
if [ ! -f "$DF_PATH" ]; then
  echo "FAIL: Dockerfile not found at '$DF_PATH'."
  exit 1
fi

# 2. Check if the typo "RUNN" is still in the Dockerfile
if grep -q "RUNN" "$DF_PATH"; then
  echo "FAIL: The syntax error 'RUNN' is still present. Change it to 'RUN'."
  exit 1
fi

# 3. Attempt to build the image
echo "Building the Dockerfile..."
if ! docker build -t test-fixed-df "$DF_DIR" > /tmp/build_fixed_df.log 2>&1; then
  echo "FAIL: Dockerfile failed to build. Build logs:"
  cat /tmp/build_fixed_df.log
  exit 1
fi

echo "PASS: Successfully fixed the Dockerfile and built the image."
exit 0
