#!/bin/bash
# validator.sh — docker-storage / 06-recover-lost-data / dkr-restore-application-data
set -euo pipefail

# 1. Check if the volume contains the file at its root with the correct content
CONTENT=$(docker run --rm -v restored-db-vol:/data alpine cat /data/db_state.json 2>/dev/null || echo "")
CONTENT_CLEANED=$(echo "$CONTENT" | tr -d '[:space:]')

EXPECTED='{"status":"restored","version":3}'

if [ "$CONTENT_CLEANED" != "$EXPECTED" ]; then
  echo "FAIL: File 'db_state.json' not found at the root of volume 'restored-db-vol' with the correct content."
  exit 1
fi

echo "PASS: Successfully verified application data restoration."
exit 0
