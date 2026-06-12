#!/bin/bash
# validator.sh — linux-networking / 04-testing-connectivity / lnx-diagnose-network-path
set -euo pipefail

TARGET_FILE="$HOME/network-test/trace_cmd.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CMD=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [[ ! "$CMD" =~ ^(traceroute|tracepath) ]]; then
  echo "FAIL: The command in $TARGET_FILE must start with 'traceroute' or 'tracepath'."
  exit 1
fi

if [[ ! "$CMD" =~ "127.0.0.1" ]] && [[ ! "$CMD" =~ "localhost" ]]; then
  echo "FAIL: The command must target the loopback address ('127.0.0.1' or 'localhost')."
  exit 1
fi

echo "PASS: Network tracing command verified successfully."
exit 0
