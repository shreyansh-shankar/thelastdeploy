#!/bin/bash
# validator.sh — linux-users-permissions / 03-chmod / lnx-secure-secret-file
set -euo pipefail

TARGET_FILE="$HOME/chmod-test/secret.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

PERMS=$(stat -c "%a" "$TARGET_FILE")
PERMS_NORM=${PERMS#0}

if [ "$PERMS_NORM" != "600" ]; then
  echo "FAIL: Expected permissions '600' (-rw-------) but found '$PERMS' on $TARGET_FILE."
  exit 1
fi

echo "PASS: Secret file successfully secured."
exit 0
