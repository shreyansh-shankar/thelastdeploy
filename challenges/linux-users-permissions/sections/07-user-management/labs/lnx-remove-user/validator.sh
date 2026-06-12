#!/bin/bash
# validator.sh — linux-users-permissions / 07-user-management / lnx-remove-user
set -euo pipefail

if id dev-intern &>/dev/null; then
  echo "FAIL: User 'dev-intern' still exists on the system."
  exit 1
fi

echo "PASS: User 'dev-intern' successfully removed from the system."
exit 0
