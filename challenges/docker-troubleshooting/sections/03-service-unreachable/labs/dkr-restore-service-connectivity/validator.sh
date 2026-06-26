#!/bin/bash
# validator.sh — docker-troubleshooting / 03-service-unreachable / dkr-restore-service-connectivity
set -euo pipefail

# 1. Get container IDs
WEB_CID=$(docker ps --filter "label=com.docker.compose.project=connectivity" --filter "label=com.docker.compose.service=web" --filter "status=running" -q)
DB_CID=$(docker ps --filter "label=com.docker.compose.project=connectivity" --filter "label=com.docker.compose.service=db" --filter "status=running" -q)

if [ -z "$WEB_CID" ] || [ -z "$DB_CID" ]; then
  echo "FAIL: Containers for 'web' and 'db' are not both running."
  exit 1
fi

# 2. Extract network lists
WEB_NETS=$(docker inspect "$WEB_CID" --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}')
DB_NETS=$(docker inspect "$DB_CID" --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}')

# 3. Find if there is an intersection
SHARED=0
for wn in $WEB_NETS; do
  for dn in $DB_NETS; do
    if [ "$wn" = "$dn" ]; then
      SHARED=1
      break 2
    fi
  done
done

if [ "$SHARED" -eq 0 ]; then
  echo "FAIL: 'web' and 'db' containers do not share any network bridge. Web networks: '$WEB_NETS', DB networks: '$DB_NETS'"
  exit 1
fi

echo "PASS: Restored network connectivity by placing both containers on a shared network."
exit 0
