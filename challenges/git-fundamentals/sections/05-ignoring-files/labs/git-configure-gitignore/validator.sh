#!/bin/bash
set -euo pipefail

REPO_DIR="$HOME/git-challenge"
GITIGNORE="$REPO_DIR/.gitignore"

if [ ! -f "$GITIGNORE" ]; then
  echo "FAIL: .gitignore file not found."
  exit 1
fi

# Test if files ending in .log are successfully ignored by git check-ignore
if ! git -C "$REPO_DIR" check-ignore -q "debug.log"; then
  echo "FAIL: Files ending in .log are not ignored."
  exit 1
fi

echo "PASS: gitignore configured correctly to ignore log files."
