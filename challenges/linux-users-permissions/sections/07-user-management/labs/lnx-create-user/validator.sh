#!/bin/bash
# validator.sh — linux-users-permissions / 07-user-management / lnx-create-user
set -euo pipefail

if ! id dev-intern &>/dev/null; then
  echo "FAIL: User 'dev-intern' does not exist on the system."
  exit 1
fi

echo "PASS: User 'dev-intern' successfully created."
exit 0
