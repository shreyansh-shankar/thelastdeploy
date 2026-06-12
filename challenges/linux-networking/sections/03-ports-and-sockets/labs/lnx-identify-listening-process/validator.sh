#!/bin/bash
# validator.sh — linux-networking / 03-ports-and-sockets / lnx-identify-listening-process
set -euo pipefail

TARGET_FILE="$HOME/network-test/listening_pid.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

SUBMITTED_PID=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ -z "$SUBMITTED_PID" ] || ! [[ "$SUBMITTED_PID" =~ ^[0-9]+$ ]]; then
  echo "FAIL: Content in $TARGET_FILE is not a valid numeric PID."
  exit 1
fi

if [ ! -d "/proc/$SUBMITTED_PID" ]; then
  echo "FAIL: Process with PID $SUBMITTED_PID is not currently running."
  exit 1
fi

# Verify the process is listening on port 9876
# We can check lsof or ss output for the PID and port 9876
if ! ss -ltnp | grep -q "9876.*pid=$SUBMITTED_PID"; then
  # Fallback to checking if cmdline contains 9876
  CMDLINE=$(cat "/proc/$SUBMITTED_PID/cmdline" 2>/dev/null | tr '\0' ' ' || true)
  if [[ ! "$CMDLINE" =~ "9876" ]]; then
    echo "FAIL: Process with PID $SUBMITTED_PID is not listening on port 9876."
    exit 1
  fi
fi

echo "PASS: Listening Process ID successfully identified."
exit 0
