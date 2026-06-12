#!/bin/bash
# validator.sh — linux-users-permissions / 05-sudo / lnx-run-sudo-command
set -euo pipefail

TARGET_FILE="$HOME/sudo-test/admin_only.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

SUBMITTED_LINE=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [[ ! "$SUBMITTED_LINE" =~ ^root: ]]; then
  echo "FAIL: The content in $TARGET_FILE does not appear to be the root entry from /etc/shadow."
  exit 1
fi

# Count colons to make sure they copied a full entry
COLON_COUNT=$(echo "$SUBMITTED_LINE" | tr -cd ':' | wc -c)
if [ "$COLON_COUNT" -lt 5 ]; then
  echo "FAIL: The line does not contain the standard number of shadow file fields."
  exit 1
fi

echo "PASS: Successfully retrieved protected system credentials using sudo."
exit 0
