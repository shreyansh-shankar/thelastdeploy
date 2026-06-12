#!/bin/bash
# validator.sh — linux-networking / 04-testing-connectivity / lnx-ping-host
set -euo pipefail

TARGET_FILE="$HOME/network-test/ping_cmd.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CMD=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [[ ! "$CMD" =~ ^ping ]]; then
  echo "FAIL: The command in $TARGET_FILE must start with 'ping'."
  exit 1
fi

if [[ ! "$CMD" =~ -c[[:space:]]*4 ]]; then
  echo "FAIL: The ping command must use the count flag to transmit exactly 4 packets (e.g. '-c 4')."
  exit 1
fi

if [[ ! "$CMD" =~ "127.0.0.1" ]] && [[ ! "$CMD" =~ "localhost" ]]; then
  echo "FAIL: The ping command must target the loopback address ('127.0.0.1' or 'localhost')."
  exit 1
fi

echo "PASS: Ping command syntax verified."
exit 0
