#!/bin/bash
# validator.sh — linux-processes-services / 03-signals / lnx-stop-misbehaving-process
set -euo pipefail

# Check if bad_process is running
if pgrep -f "bad_process" &>/dev/null; then
  echo "FAIL: 'bad_process' is still running on the system."
  exit 1
fi

echo "PASS: Misbehaving process successfully stopped."
exit 0
