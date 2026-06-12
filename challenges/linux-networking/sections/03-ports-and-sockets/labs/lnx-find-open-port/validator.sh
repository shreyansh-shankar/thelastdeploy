#!/bin/bash
# validator.sh — linux-networking / 03-ports-and-sockets / lnx-find-open-port
set -euo pipefail

TARGET_FILE="$HOME/network-test/open_port.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

PORT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$PORT" != "9876" ]; then
  echo "FAIL: Expected port '9876' but found '$PORT' in $TARGET_FILE."
  exit 1
fi

echo "PASS: Active local listener port successfully identified."
exit 0
