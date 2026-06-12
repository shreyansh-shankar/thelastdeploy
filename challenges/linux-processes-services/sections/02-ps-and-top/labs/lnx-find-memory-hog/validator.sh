#!/bin/bash
# validator.sh — linux-processes-services / 02-ps-and-top / lnx-find-memory-hog
set -euo pipefail

TARGET_FILE="$HOME/process-test/memory_hog.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

SUBMITTED_PID=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ -z "$SUBMITTED_PID" ] || ! [[ "$SUBMITTED_PID" =~ ^[0-9]+$ ]]; then
  echo "FAIL: Content in $TARGET_FILE is not a valid numeric PID."
  exit 1
fi

# Verify if the process with the PID exists
if [ ! -d "/proc/$SUBMITTED_PID" ]; then
  echo "FAIL: Process with PID $SUBMITTED_PID is not currently running."
  exit 1
fi

# Verify process name matches mem_hog_process
# Reading /proc/<pid>/comm or /proc/<pid>/cmdline
PROC_COMM=$(cat "/proc/$SUBMITTED_PID/comm" 2>/dev/null || true)
PROC_CMDLINE=$(cat "/proc/$SUBMITTED_PID/cmdline" 2>/dev/null || true)

if [[ "$PROC_COMM" != "mem_hog_process" ]] && [[ ! "$PROC_CMDLINE" =~ "mem_hog_process" ]]; then
  echo "FAIL: Process with PID $SUBMITTED_PID is not 'mem_hog_process'."
  exit 1
fi

echo "PASS: Memory hog process successfully identified by PID."
exit 0
