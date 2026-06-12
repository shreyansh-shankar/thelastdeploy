#!/bin/bash
# validator.sh — linux-processes-services / 04-background-jobs / lnx-resume-suspended-job
set -euo pipefail

PID=$(pgrep -f "suspended_job" | head -n 1 || true)

if [ -z "$PID" ]; then
  echo "FAIL: The process 'suspended_job' was not found on the system. Did you stop it entirely?"
  exit 1
fi

# Get the process state
STATE=$(ps -o state= -p "$PID" | xargs)

if [ "$STATE" = "T" ]; then
  echo "FAIL: The process 'suspended_job' (PID $PID) is still suspended (state: Stopped)."
  exit 1
fi

echo "PASS: Process successfully resumed and is running in the background (state: $STATE)."
exit 0
