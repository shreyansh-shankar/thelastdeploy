#!/bin/bash
# validator.sh — linux-users-permissions / 07-user-management / lnx-add-user-group
set -euo pipefail

if ! id dev-intern &>/dev/null; then
  echo "FAIL: User 'dev-intern' does not exist. Please complete Task 1 first."
  exit 1
fi

if ! getent group dev-team &>/dev/null; then
  echo "FAIL: Group 'dev-team' does not exist. Please complete Task 2 first."
  exit 1
fi

# Check if dev-intern is in group dev-team
if ! id -Gn dev-intern | grep -qw "dev-team"; then
  echo "FAIL: User 'dev-intern' is not a member of group 'dev-team'."
  exit 1
fi

echo "PASS: User 'dev-intern' successfully added to group 'dev-team'."
exit 0
