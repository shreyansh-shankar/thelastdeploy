#!/bin/bash
# validator.sh — docker-fundamentals / 05-run-a-web-server / dkr-access-web-container
set -euo pipefail

FILE="$HOME/docker-test/web_status.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/docker-test/web_status.txt not found."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)

if [ "$CONTENT" != "200" ]; then
  echo "FAIL: The response code inside web_status.txt is incorrect. Expected '200', got: '$CONTENT'"
  exit 1
fi

echo "PASS: Successfully queried the web container and saved the response code."
exit 0
