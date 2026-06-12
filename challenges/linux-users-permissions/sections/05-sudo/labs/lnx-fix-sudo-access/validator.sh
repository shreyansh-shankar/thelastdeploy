#!/bin/bash
# validator.sh — linux-users-permissions / 05-sudo / lnx-fix-sudo-access
set -euo pipefail

TARGET_FILE="$HOME/sudo-test/deployer-sudo"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

# Clean comments and empty lines
CLEANED_RULES=$(grep -v '^#' "$TARGET_FILE" | grep -v '^[[:space:]]*$' | xargs)

# Match: deployer ALL=(ALL:ALL) NOPASSWD: ALL or deployer ALL=(ALL) NOPASSWD: ALL
# Allow variations in spacing
EXPECTED_PATTERN="^deployer[[:space:]]+ALL[[:space:]]*=[[:space:]]*\([[:space:]]*ALL(:ALL)?[[:space:]]*\)[[:space:]]+NOPASSWD:[[:space:]]*ALL$"

if [[ ! "$CLEANED_RULES" =~ $EXPECTED_PATTERN ]]; then
  echo "FAIL: The rule inside $TARGET_FILE does not match the required passwordless sudo format for deployer."
  echo "Your entry: '$CLEANED_RULES'"
  exit 1
fi

echo "PASS: Passwordless sudo rule successfully configured for deployer."
exit 0
