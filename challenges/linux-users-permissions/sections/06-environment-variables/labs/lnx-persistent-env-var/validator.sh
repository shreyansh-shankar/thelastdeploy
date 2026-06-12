#!/bin/bash
# validator.sh — linux-users-permissions / 06-environment-variables / lnx-persistent-env-var
set -euo pipefail

BASHRC="$HOME/.bashrc"

if [ ! -f "$BASHRC" ]; then
  echo "FAIL: Shell configuration file ~/.bashrc not found."
  exit 1
fi

# Check if bashrc contains export PLATFORM_NAME=DevLabPlatform
if ! grep -qE "export[[:space:]]+PLATFORM_NAME=[\"']?DevLabPlatform[\"']?" "$BASHRC"; then
  echo "FAIL: Your ~/.bashrc does not contain a persistent export statement for PLATFORM_NAME=DevLabPlatform."
  exit 1
fi

echo "PASS: Environment variable successfully persisted in ~/.bashrc."
exit 0
