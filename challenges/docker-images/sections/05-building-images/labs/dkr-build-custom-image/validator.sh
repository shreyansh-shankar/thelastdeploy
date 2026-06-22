#!/bin/bash
# validator.sh — docker-images / 05-building-images / dkr-build-custom-image
set -euo pipefail

# Check if image exists
if ! docker image inspect my-custom-app:v1.0 >/dev/null 2>&1; then
  echo "FAIL: Docker image 'my-custom-app:v1.0' not found. Make sure to build it with '-t my-custom-app:v1.0'."
  exit 1
fi

echo "PASS: Successfully built custom image 'my-custom-app:v1.0'."
exit 0
