#!/bin/bash
set -euo pipefail

REPO_DIR="$HOME/git-challenge"

# Verify README.md exists
if [ ! -f "$REPO_DIR/README.md" ]; then
  echo "FAIL: README.md not found."
  exit 1
fi

# Check if README.md is in Git index (staged)
if ! git -C "$REPO_DIR" diff --name-only --cached | grep -q "README.md"; then
  echo "FAIL: README.md is not added to the staging area."
  exit 1
fi

# Check that it has not been committed yet
if git -C "$REPO_DIR" log -1 >/dev/null 2>&1; then
  echo "FAIL: README.md has already been committed. It should only be staged."
  exit 1
fi

echo "PASS: README.md staged successfully."
