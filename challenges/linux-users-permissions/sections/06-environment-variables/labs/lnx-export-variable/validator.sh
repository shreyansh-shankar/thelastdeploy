#!/bin/bash
# validator.sh — linux-users-permissions / 06-environment-variables / lnx-export-variable
set -euo pipefail

TARGET_FILE="$HOME/env-test/export_cmd.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CONTENT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

# Match export DEVLAB_MODE=production (with or without single/double quotes)
EXPECTED_PATTERN="^export[[:space:]]+DEVLAB_MODE=[\"']?production[\"']?$"

if [[ ! "$CONTENT" =~ $EXPECTED_PATTERN ]]; then
  echo "FAIL: Content inside $TARGET_FILE does not match export syntax."
  echo "Your entry: '$CONTENT'"
  exit 1
fi

echo "PASS: Environment variable export syntax verified."
exit 0
