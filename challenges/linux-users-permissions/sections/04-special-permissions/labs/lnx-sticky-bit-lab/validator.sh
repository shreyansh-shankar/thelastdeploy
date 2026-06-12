#!/bin/bash
# validator.sh — linux-users-permissions / 04-special-permissions / lnx-sticky-bit-lab
set -euo pipefail

TARGET_DIR="$HOME/special-test/sticky-dir"

if [ ! -d "$TARGET_DIR" ]; then
  echo "FAIL: Directory $TARGET_DIR not found."
  exit 1
fi

# Check if Sticky Bit is set
if [ ! -k "$TARGET_DIR" ]; then
  echo "FAIL: Sticky Bit is not set on $TARGET_DIR."
  exit 1
fi

# Verify permissions are correct (e.g. 1777)
PERMS=$(stat -c "%a" "$TARGET_DIR")
if [ "$PERMS" != "1777" ] && [ "$PERMS" != "777" ]; then # 1777 normally
  # Sticky bit is set (tested with [ -k ]), but check permissions
  if [ ! -r "$TARGET_DIR" ] || [ ! -w "$TARGET_DIR" ]; then
    echo "FAIL: Directory must remain readable and writable by everyone."
    exit 1
  fi
fi

echo "PASS: Sticky Bit configured successfully."
exit 0
