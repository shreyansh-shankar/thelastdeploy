#!/bin/bash
# validator.sh — linux-networking / 06-dns-basics / lnx-resolve-domain
set -euo pipefail

TARGET_FILE="$HOME/network-test/resolved_dns.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

IP=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ "$IP" != "127.0.0.1" ]; then
  echo "FAIL: Expected IP '127.0.0.1' but found '$IP' in $TARGET_FILE."
  exit 1
fi

echo "PASS: DNS lookup verified successfully."
exit 0
