#!/bin/bash
# validator.sh — linux-fundamentals / 02-terminal-basics / lnx-open-terminal
set -euo pipefail

if [ ! -f "$HOME/terminal_ready" ]; then
  echo "FAIL: File terminal_ready not found in your home directory ($HOME). Please open the terminal and run 'touch ~/terminal_ready' to pass."
  exit 1
fi

echo "PASS: Terminal ready"
exit 0
