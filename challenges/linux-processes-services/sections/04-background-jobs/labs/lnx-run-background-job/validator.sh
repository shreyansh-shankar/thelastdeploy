#!/bin/bash
# validator.sh — linux-processes-services / 04-background-jobs / lnx-run-background-job
set -euo pipefail

TARGET_FILE="$HOME/jobs-test/bg_pid.txt"

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
  echo "FAIL: Process with PID $SUBMITTED_PID is not running."
  exit 1
fi

CMDLINE=$(cat "/proc/$SUBMITTED_PID/cmdline" 2>/dev/null | tr '\0' ' ' || true)
if [[ ! "$CMDLINE" =~ "sleep 999" ]]; then
  echo "FAIL: Process with PID $SUBMITTED_PID is not 'sleep 999'."
  exit 1
fi

echo "PASS: Background sleep process is running successfully."
exit 0
