#!/bin/bash
# validator.sh — docker-troubleshooting / 05-container-incident-response / dkr-investigate-production-incident
set -euo pipefail

# 1. Get container ID
APP_CID=$(docker ps --filter "label=com.docker.compose.project=incident" --filter "label=com.docker.compose.service=app" --filter "status=running" -q)

if [ -z "$APP_CID" ]; then
  echo "FAIL: Application service 'app' is not running."
  exit 1
fi

# 2. Check that the configuration file exists inside the container and has the right content
CONTENT=$(docker exec "$APP_CID" cat /etc/app/config.json 2>/dev/null || echo "")

if [ -z "$CONTENT" ]; then
  echo "FAIL: /etc/app/config.json not found or empty inside the container."
  exit 1
fi

CLEANED_CONTENT=$(echo "$CONTENT" | tr -d '[:space:]')
if [[ "$CLEANED_CONTENT" != *"\"status\":\"ok\""* ]]; then
  echo "FAIL: config.json content is incorrect. Expected: '{\"status\": \"ok\"}', got: '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully mounted config.json and resolved application crash loop!"
exit 0
