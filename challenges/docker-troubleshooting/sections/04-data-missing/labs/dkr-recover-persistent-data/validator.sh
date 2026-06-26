#!/bin/bash
# validator.sh — docker-troubleshooting / 04-data-missing / dkr-recover-persistent-data
set -euo pipefail

# 1. Get database container ID
DB_CID=$(docker ps --filter "label=com.docker.compose.project=persistence" --filter "label=com.docker.compose.service=db" --filter "status=running" -q)

if [ -z "$DB_CID" ]; then
  echo "FAIL: Database service 'db' is not running."
  exit 1
fi

# 2. Check mount destination
MOUNTS=$(docker inspect "$DB_CID" --format '{{range .Mounts}}{{.Destination}} {{.Source}}
{{end}}')

if ! echo "$MOUNTS" | grep -q "/var/lib/postgresql/data"; then
  echo "FAIL: Volume is not mounted to /var/lib/postgresql/data inside the container. Current mounts: '$MOUNTS'"
  exit 1
fi

# 3. Verify file content inside container
if ! docker exec "$DB_CID" cat /var/lib/postgresql/data/marker.txt 2>/dev/null | grep -q "RECOVERED_DATA_88"; then
  echo "FAIL: Persistent marker.txt was not found or is unreadable at /var/lib/postgresql/data/marker.txt."
  exit 1
fi

echo "PASS: Successfully corrected mount mapping and restored persistent database folder."
exit 0
