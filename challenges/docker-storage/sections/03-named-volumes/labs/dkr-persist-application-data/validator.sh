#!/bin/bash
# validator.sh — docker-storage / 03-named-volumes / dkr-persist-application-data
set -euo pipefail

# 1. Check if db-container is stopped/removed
if docker ps -a --filter name=db-container --format '{{.Names}}' | grep -q "^db-container$"; then
  echo "FAIL: Container 'db-container' is still present. It should be stopped and removed."
  exit 1
fi

# 2. Check if db-container-new exists and is running
if ! docker ps --filter name=db-container-new --format '{{.Names}}' | grep -q "^db-container-new$"; then
  echo "FAIL: Container 'db-container-new' not found running."
  exit 1
fi

# 3. Check mounts of db-container-new
MOUNT_TYPE=$(docker inspect db-container-new --format '{{range .Mounts}}{{if eq .Destination "/usr/share/nginx/html"}}{{.Type}}{{end}}{{end}}' 2>/dev/null || echo "")
MOUNT_NAME=$(docker inspect db-container-new --format '{{range .Mounts}}{{if eq .Destination "/usr/share/nginx/html"}}{{.Name}}{{end}}{{end}}' 2>/dev/null || echo "")

if [ "$MOUNT_TYPE" != "volume" ]; then
  echo "FAIL: Destination /usr/share/nginx/html is not configured as a volume (Got: '$MOUNT_TYPE')."
  exit 1
fi

if [ "$MOUNT_NAME" != "db-storage-vol" ]; then
  echo "FAIL: The mounted volume is not 'db-storage-vol' (Got: '$MOUNT_NAME')."
  exit 1
fi

# 4. Check index.html content
CONTENT=$(docker exec db-container-new cat /usr/share/nginx/html/index.html 2>/dev/null || echo "")
CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '\r' | xargs)

if [ "$CONTENT_CLEANED" != "Database persistent content" ]; then
  echo "FAIL: The persistent file content is not 'Database persistent content'. Got: '$CONTENT_CLEANED'"
  exit 1
fi

echo "PASS: Successfully verified data persistence across container replacements using named volumes."
exit 0
