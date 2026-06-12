#!/bin/bash
# validator.sh — linux-users-permissions / 03-chmod / lnx-public-readonly-file
set -euo pipefail

TARGET_FILE="$HOME/chmod-test/readme.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

PERMS=$(stat -c "%a" "$TARGET_FILE")
PERMS_NORM=${PERMS#0}

if [ "$PERMS_NORM" != "644" ]; then
  echo "FAIL: Expected permissions '644' (-rw-r--r--) but found '$PERMS' on $TARGET_FILE."
  exit 1
fi

echo "PASS: Public read-only permissions configured successfully."
exit 0
