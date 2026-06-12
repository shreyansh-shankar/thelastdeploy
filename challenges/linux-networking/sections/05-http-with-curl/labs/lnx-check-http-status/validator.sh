#!/bin/bash
# validator.sh — linux-networking / 05-http-with-curl / lnx-check-http-status
set -euo pipefail

TARGET_FILE="$HOME/network-test/http_status.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

STATUS=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$STATUS" != "200" ]; then
  echo "FAIL: Expected HTTP status code '200' but found '$STATUS' in $TARGET_FILE."
  exit 1
fi

echo "PASS: HTTP status code verified successfully."
exit 0
