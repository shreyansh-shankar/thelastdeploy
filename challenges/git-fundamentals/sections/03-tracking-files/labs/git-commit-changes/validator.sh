#!/bin/bash
set -euo pipefail

REPO_DIR="$HOME/git-challenge"

# Verify a commit has been made
if ! git -C "$REPO_DIR" log -1 >/dev/null 2>&1; then
  echo "FAIL: No commits found in the repository."
  exit 1
fi

# Verify the index and working tree are clean (meaning README.md was committed)
if [ -n "$(git -C "$REPO_DIR" status --porcelain)" ]; then
  echo "FAIL: Repository working tree is not clean. Ensure all changes are committed."
  exit 1
fi

echo "PASS: Staged changes committed successfully."
