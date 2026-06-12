#!/bin/bash
# validator.sh — linux-users-permissions / 06-environment-variables / lnx-create-env-var
set -euo pipefail

TARGET_FILE="$HOME/env-test/local_var.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

CONTENT=$(tr -d '\r' < "$TARGET_FILE" | xargs)

# Match MY_LOCAL_VAR=devlab_local (with or without single/double quotes)
EXPECTED_PATTERN="^MY_LOCAL_VAR=[\"']?devlab_local[\"']?$"

if [[ ! "$CONTENT" =~ $EXPECTED_PATTERN ]]; then
  echo "FAIL: Content inside $TARGET_FILE does not match local shell variable syntax."
  echo "Your entry: '$CONTENT'"
  exit 1
fi

echo "PASS: Local shell variable successfully declared."
exit 0
