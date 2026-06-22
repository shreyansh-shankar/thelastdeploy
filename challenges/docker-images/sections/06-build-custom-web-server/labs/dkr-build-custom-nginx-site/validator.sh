#!/bin/bash
# validator.sh — docker-images / 06-build-custom-web-server / dkr-build-custom-nginx-site
set -euo pipefail

DF_DIR="$HOME/docker-build/nginx-custom"
DF_PATH="$DF_DIR/Dockerfile"

# 1. Check if Dockerfile exists
if [ ! -f "$DF_PATH" ]; then
  echo "FAIL: Dockerfile not found at '$DF_PATH'."
  exit 1
fi

# 2. Check if Dockerfile uses nginx:alpine as base
if ! grep -qi "FROM[[:space:]]\+nginx:alpine" "$DF_PATH"; then
  echo "FAIL: Base image in Dockerfile is not nginx:alpine. Make sure to use 'FROM nginx:alpine'."
  exit 1
fi

# 3. Check if image exists
if ! docker image inspect my-nginx-web:latest >/dev/null 2>&1; then
  echo "FAIL: Docker image 'my-nginx-web:latest' not found. Make sure to build it with '-t my-nginx-web:latest'."
  exit 1
fi

# 4. Check if the index.html was copied correctly inside the image
CONTENT=$(docker run --rm my-nginx-web:latest cat /usr/share/nginx/html/index.html 2>/dev/null || echo "")
CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '\r' | xargs)

if [ "$CONTENT_CLEANED" != "<h1>Hello from Nginx</h1>" ]; then
  echo "FAIL: Custom index.html was not copied correctly to /usr/share/nginx/html/index.html inside the container. Got: '$CONTENT_CLEANED'"
  exit 1
fi

echo "PASS: Successfully built custom Nginx web server image."
exit 0
