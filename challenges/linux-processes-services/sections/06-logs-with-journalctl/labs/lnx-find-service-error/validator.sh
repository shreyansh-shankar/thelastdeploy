#!/bin/bash
# validator.sh — linux-processes-services / 06-logs-with-journalctl / lnx-find-service-error
set -euo pipefail

TARGET_FILE="$HOME/logs-test/secret_key.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

KEY=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$KEY" != "SEC_PROC_99" ]; then
  echo "FAIL: The value in $TARGET_FILE is not the correct secret key."
  exit 1
fi

echo "PASS: Secret key successfully extracted from journalctl logs."
exit 0
