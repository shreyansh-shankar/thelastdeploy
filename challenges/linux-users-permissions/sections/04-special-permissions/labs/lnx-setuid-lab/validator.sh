#!/bin/bash
# validator.sh — linux-users-permissions / 04-special-permissions / lnx-setuid-lab
set -euo pipefail

TARGET_FILE="$HOME/special-test/suid-helper"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

# Check if SUID bit is set
if [ ! -u "$TARGET_FILE" ]; then
  echo "FAIL: SUID bit is not set on $TARGET_FILE."
  exit 1
fi

# Verify permissions are correct (e.g. 4755)
PERMS=$(stat -c "%a" "$TARGET_FILE")
if [ "$PERMS" != "4755" ] && [ "$PERMS" != "755" ]; then # 4755 normally
  # SUID is set (tested with [ -u ]), but let's confirm it's readable/executable
  if [ ! -x "$TARGET_FILE" ]; then
    echo "FAIL: Helper file must remain executable."
    exit 1
  fi
fi

echo "PASS: SUID bit successfully configured on helper executable."
exit 0
