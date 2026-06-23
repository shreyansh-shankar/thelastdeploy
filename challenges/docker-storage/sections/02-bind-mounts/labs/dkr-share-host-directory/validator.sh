#!/bin/bash
# validator.sh — docker-storage / 02-bind-mounts / dkr-share-host-directory
set -euo pipefail

# 1. Check if container nginx-mount exists and is running
if ! docker ps --filter name=nginx-mount --format '{{.Names}}' | grep -q "^nginx-mount$"; then
  echo "FAIL: Container 'nginx-mount' not found running."
  exit 1
fi

# 2. Check port mapping
PORT_NUM=$(docker inspect nginx-mount --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' 2>/dev/null || echo "")
if [ "$PORT_NUM" != "8085" ]; then
  echo "FAIL: Port 80 is not mapped to host port 8085. Got: '$PORT_NUM'"
  exit 1
fi

# 3. Check mounts
MOUNT_TYPE=$(docker inspect nginx-mount --format '{{range .Mounts}}{{if eq .Destination "/usr/share/nginx/html"}}{{.Type}}{{end}}{{end}}' 2>/dev/null || echo "")
MOUNT_SOURCE=$(docker inspect nginx-mount --format '{{range .Mounts}}{{if eq .Destination "/usr/share/nginx/html"}}{{.Source}}{{end}}{{end}}' 2>/dev/null || echo "")

if [ "$MOUNT_TYPE" != "bind" ]; then
  echo "FAIL: Destination /usr/share/nginx/html is not configured as a bind mount (Got: '$MOUNT_TYPE')."
  exit 1
fi

# Resolve any relative elements or check matches
EXPECTED_SOURCE="$HOME/docker-share"
if [ "$MOUNT_SOURCE" != "$EXPECTED_SOURCE" ]; then
  echo "FAIL: Bind mount source is not '$EXPECTED_SOURCE' (Got: '$MOUNT_SOURCE')."
  exit 1
fi

# 4. Check if the site is serving the correct content
CONTENT=$(docker exec nginx-mount cat /usr/share/nginx/html/index.html 2>/dev/null || echo "")
CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '\r' | xargs)

if [[ "$CONTENT_CLEANED" != *"Welcome to Bind Mounts"* ]]; then
  echo "FAIL: Custom index.html content not found inside container web root. Got: '$CONTENT_CLEANED'"
  exit 1
fi

echo "PASS: Successfully mounted host directory to Nginx container."
exit 0
