#!/bin/bash
# validator.sh — linux-networking / 03-ports-and-sockets / lnx-find-open-port
set -euo pipefail

TARGET_FILE="$HOME/network-test/open_port.txt"

if [ ! -f "$TARGET_FILE" ]; then
    echo "FAIL: File $TARGET_FILE not found."
    exit 1
fi

EXPECTED_PORT=$(cat /tmp/tld-open-port)
USER_PORT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$USER_PORT" != "$EXPECTED_PORT" ]; then
    echo "FAIL: Expected port '$EXPECTED_PORT' but found '$USER_PORT'."
    exit 1
fi

echo "PASS: Active local listener port successfully identified."
exit 0
