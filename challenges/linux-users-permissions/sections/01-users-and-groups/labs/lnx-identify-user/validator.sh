#!/bin/bash
# validator.sh — linux-users-permissions / 01-users-and-groups / lnx-identify-user
set -euo pipefail

TARGET_FILE="$HOME/users-groups-test/current_user.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

EXPECTED_USER=$(whoami)
SUBMITTED_USER=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$SUBMITTED_USER" != "$EXPECTED_USER" ]; then
  echo "FAIL: Expected username '$EXPECTED_USER' but found '$SUBMITTED_USER' in $TARGET_FILE."
  exit 1
fi

echo "PASS: Username successfully identified and saved."
exit 0
