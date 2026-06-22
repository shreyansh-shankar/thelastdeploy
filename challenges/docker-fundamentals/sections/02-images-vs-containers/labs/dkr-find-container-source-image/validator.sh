#!/bin/bash
# validator.sh — docker-fundamentals / 02-images-vs-containers / dkr-find-container-source-image
set -euo pipefail

FILE="$HOME/docker-test/source_image.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/docker-test/source_image.txt not found."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)

if [ "$CONTENT" != "alpine:3.18.5" ] && [ "$CONTENT" != "alpine" ] && [ "$CONTENT" != "docker.io/library/alpine:3.18.5" ]; then
  echo "FAIL: Image name inside source_image.txt is incorrect. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Source image successfully identified."
exit 0
