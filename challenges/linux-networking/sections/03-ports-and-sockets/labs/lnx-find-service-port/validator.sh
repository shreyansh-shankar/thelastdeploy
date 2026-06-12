#!/bin/bash
# validator.sh — linux-networking / 03-ports-and-sockets / lnx-find-service-port
set -euo pipefail

TARGET_FILE="$HOME/network-test/ssh_port.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

PORT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$PORT" != "22" ]; then
  echo "FAIL: Expected standard SSH port '22' but found '$PORT' in $TARGET_FILE."
  exit 1
fi

echo "PASS: SSH service port successfully identified."
exit 0
