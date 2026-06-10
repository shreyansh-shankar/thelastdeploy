#!/bin/bash
# validator.sh — docker-advanced / 01-custom-images / dkr-build-web
set -euo pipefail

# 1. Check Docker daemon is running
if ! docker info &>/dev/null; then
  echo "FAIL: Docker daemon is not running"
  exit 1
fi

# 2. Check if the my-web-app:latest image exists
if ! docker images my-web-app:latest --format "{{.Repository}}:{{.Tag}}" | grep -q "my-web-app:latest"; then
  echo "FAIL: Docker image 'my-web-app:latest' not found. Did you run 'docker build -t my-web-app:latest .'?"
  exit 1
fi

# 3. Check if container tld-my-web-app is running
if ! docker ps --filter "name=tld-my-web-app" --format "{{.Names}}" | grep -q "^tld-my-web-app$"; then
  echo "FAIL: Container 'tld-my-web-app' is not running."
  exit 1
fi

# 4. Check if we can reach it on port 8256
if ! curl -s --connect-timeout 2 http://localhost:8256 &>/dev/null; then
  echo "FAIL: Could not connect to container on http://localhost:8256 — is port 8256 mapped to container's port 80?"
  exit 1
fi

echo "PASS: Custom Docker image built and running container successfully serving on port 8256"
exit 0
