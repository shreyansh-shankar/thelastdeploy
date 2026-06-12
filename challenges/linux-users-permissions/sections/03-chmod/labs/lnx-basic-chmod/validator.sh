#!/bin/bash
# validator.sh — linux-users-permissions / 03-chmod / lnx-basic-chmod
set -euo pipefail

TARGET_FILE="$HOME/chmod-test/script.sh"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

PERMS=$(stat -c "%a" "$TARGET_FILE")

# Normalize: strip leading zero if present (some versions of stat print 0755)
PERMS_NORM=${PERMS#0}

if [ "$PERMS_NORM" != "755" ]; then
  echo "FAIL: Expected permissions '755' (-rwxr-xr-x) but found '$PERMS' on $TARGET_FILE."
  exit 1
fi

echo "PASS: Script file is now executable by everyone and writable only by the owner."
exit 0
