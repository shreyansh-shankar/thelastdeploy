#!/bin/bash
# validator.sh — linux-users-permissions / 07-user-management / lnx-create-group
set -euo pipefail

if ! getent group dev-team &>/dev/null; then
  echo "FAIL: Group 'dev-team' does not exist on the system."
  exit 1
fi

echo "PASS: Group 'dev-team' successfully created."
exit 0
