#!/bin/bash
# validator.sh — linux-networking / 05-http-with-curl / lnx-query-api-endpoint
set -euo pipefail

TARGET_FILE="$HOME/network-test/api_response.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CONTENT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$CONTENT" != "created successfully" ]; then
  echo "FAIL: Expected API POST response 'created successfully' but found '$CONTENT' in $TARGET_FILE."
  exit 1
fi

echo "PASS: API POST request verified successfully."
exit 0
