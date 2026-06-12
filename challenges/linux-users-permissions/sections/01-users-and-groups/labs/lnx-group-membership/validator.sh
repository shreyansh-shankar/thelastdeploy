#!/bin/bash
# validator.sh — linux-users-permissions / 01-users-and-groups / lnx-group-membership
set -euo pipefail

TARGET_FILE="$HOME/users-groups-test/my_groups.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

# Get list of expected group names, sorted to avoid ordering mismatches
EXPECTED_GROUPS=$(groups | tr ' ' '\n' | sort | xargs)
SUBMITTED_GROUPS=$(tr ' ' '\n' < "$TARGET_FILE" | tr -d '\r' | sort | xargs)

if [ "$SUBMITTED_GROUPS" != "$EXPECTED_GROUPS" ]; then
  echo "FAIL: Groups listed in $TARGET_FILE do not match your active user's group memberships."
  echo "Expected groups: $EXPECTED_GROUPS"
  echo "Submitted groups: $SUBMITTED_GROUPS"
  exit 1
fi

echo "PASS: Group memberships successfully verified."
exit 0
