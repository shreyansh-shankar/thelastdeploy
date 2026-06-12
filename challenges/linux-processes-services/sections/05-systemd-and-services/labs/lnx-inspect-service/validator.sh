#!/bin/bash
# validator.sh — linux-processes-services / 05-systemd-and-services / lnx-inspect-service
set -euo pipefail

TARGET_FILE="$HOME/service-test/cron_status.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

STATUS=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$STATUS" != "active" ]; then
  echo "FAIL: Expected status 'active' but found '$STATUS' in $TARGET_FILE."
  exit 1
fi

echo "PASS: Cron service status inspected successfully."
exit 0
