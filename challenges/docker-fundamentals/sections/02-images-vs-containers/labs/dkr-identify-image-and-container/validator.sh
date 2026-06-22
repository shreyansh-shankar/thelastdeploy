#!/bin/bash
# validator.sh — docker-fundamentals / 02-images-vs-containers / dkr-identify-image-and-container
set -euo pipefail

IMAGE_FILE="$HOME/docker-test/image_id.txt"
CONTAINER_FILE="$HOME/docker-test/container_id.txt"

if [ ! -f "$IMAGE_FILE" ]; then
  echo "FAIL: File ~/docker-test/image_id.txt not found."
  exit 1
fi

if [ ! -f "$CONTAINER_FILE" ]; then
  echo "FAIL: File ~/docker-test/container_id.txt not found."
  exit 1
fi

USER_IMAGE_ID=$(tr -d '\r\n' < "$IMAGE_FILE" | xargs)
USER_CONTAINER_ID=$(tr -d '\r\n' < "$CONTAINER_FILE" | xargs)

if [ -z "$USER_IMAGE_ID" ]; then
  echo "FAIL: image_id.txt is empty."
  exit 1
fi

if [ -z "$USER_CONTAINER_ID" ]; then
  echo "FAIL: container_id.txt is empty."
  exit 1
fi

# Fetch expected image IDs
EXPECTED_IMAGE_LONG=$(docker image inspect hello-world:latest --format '{{.Id}}' 2>/dev/null || echo "")
EXPECTED_IMAGE_SHORT=$(docker images hello-world:latest --format '{{.ID}}' 2>/dev/null || echo "")

if [ -z "$EXPECTED_IMAGE_LONG" ]; then
  echo "FAIL: hello-world image not found in host docker registry."
  exit 1
fi

# Normalize (remove sha256: prefix if present)
USER_IMAGE_CLEAN="${USER_IMAGE_ID#sha256:}"
EXPECTED_IMAGE_LONG_CLEAN="${EXPECTED_IMAGE_LONG#sha256:}"

# Match checks
IMAGE_MATCHED=false
if [ "$USER_IMAGE_ID" = "$EXPECTED_IMAGE_LONG" ] || \
   [ "$USER_IMAGE_ID" = "$EXPECTED_IMAGE_SHORT" ] || \
   [ "$USER_IMAGE_CLEAN" = "$EXPECTED_IMAGE_LONG_CLEAN" ] || \
   [[ "$EXPECTED_IMAGE_LONG_CLEAN" == "$USER_IMAGE_CLEAN"* ]]; then
  IMAGE_MATCHED=true
fi

if [ "$IMAGE_MATCHED" = false ]; then
  echo "FAIL: The ID in image_id.txt does not match the image ID of hello-world:latest."
  echo "Your entry: '$USER_IMAGE_ID', Expected: '$EXPECTED_IMAGE_SHORT'"
  exit 1
fi

# Fetch expected container IDs
EXPECTED_CONTAINER_LONG=$(docker inspect ident-target-container --format '{{.Id}}' 2>/dev/null || echo "")
EXPECTED_CONTAINER_SHORT=$(docker ps -a --filter name=ident-target-container --format '{{.ID}}' 2>/dev/null || echo "")

if [ -z "$EXPECTED_CONTAINER_LONG" ]; then
  echo "FAIL: Container ident-target-container not found on host."
  exit 1
fi

USER_CONTAINER_CLEAN="${USER_CONTAINER_ID#sha256:}"
EXPECTED_CONTAINER_LONG_CLEAN="${EXPECTED_CONTAINER_LONG#sha256:}"

CONTAINER_MATCHED=false
if [ "$USER_CONTAINER_ID" = "$EXPECTED_CONTAINER_LONG" ] || \
   [ "$USER_CONTAINER_ID" = "$EXPECTED_CONTAINER_SHORT" ] || \
   [ "$USER_CONTAINER_CLEAN" = "$EXPECTED_CONTAINER_LONG_CLEAN" ] || \
   [[ "$EXPECTED_CONTAINER_LONG_CLEAN" == "$USER_CONTAINER_CLEAN"* ]]; then
  CONTAINER_MATCHED=true
fi

if [ "$CONTAINER_MATCHED" = false ]; then
  echo "FAIL: The ID in container_id.txt does not match the container ID of 'ident-target-container'."
  echo "Your entry: '$USER_CONTAINER_ID', Expected: '$EXPECTED_CONTAINER_SHORT'"
  exit 1
fi

echo "PASS: Successfully identified the correct image and container IDs."
exit 0
