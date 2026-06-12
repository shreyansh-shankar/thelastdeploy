#!/bin/bash
# validator.sh — linux-users-permissions / 02-ownership / lnx-fix-owner
set -euo pipefail

TARGET_FILE="$HOME/ownership-test/admin-file.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CURRENT_OWNER=$(stat -c "%U" "$TARGET_FILE")
CURRENT_GROUP=$(stat -c "%G" "$TARGET_FILE")

if [ "$CURRENT_OWNER" != "root" ] || [ "$CURRENT_GROUP" != "root" ]; then
  echo "FAIL: File is owned by '$CURRENT_OWNER:$CURRENT_GROUP'. It must be owned by 'root:root'."
  exit 1
fi

echo "PASS: File ownership successfully changed to root:root."
exit 0
