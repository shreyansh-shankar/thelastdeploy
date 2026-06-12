#!/bin/bash
# validator.sh — linux-users-permissions / 02-ownership / lnx-check-owner
set -euo pipefail

TARGET_FILE="$HOME/ownership-test/owner_info.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

EXPECTED_OWNERSHIP=$(stat -c "%U:%G" /tmp/ownership-check.txt)
SUBMITTED_OWNERSHIP=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$SUBMITTED_OWNERSHIP" != "$EXPECTED_OWNERSHIP" ]; then
  echo "FAIL: Expected ownership '$EXPECTED_OWNERSHIP' but found '$SUBMITTED_OWNERSHIP' in $TARGET_FILE."
  exit 1
fi

echo "PASS: Ownership correctly identified."
exit 0
