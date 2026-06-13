#!/bin/bash
set -euo pipefail

REPO="$HOME/git-challenge"

if [ ! -d "$REPO/.git" ]; then
  echo "FAIL: Repository not initialized inside $REPO."
  exit 1
fi

if [ ! -f "$REPO/.gitignore" ]; then
  echo "FAIL: .gitignore file not found."
  exit 1
fi

# Verify .tmp files are ignored
if ! git -C "$REPO" check-ignore -q "temp.tmp"; then
  echo "FAIL: Files ending in .tmp are not ignored in .gitignore."
  exit 1
fi

if [ ! -f "$REPO/index.html" ]; then
  echo "FAIL: index.html not found."
  exit 1
fi

if ! git -C "$REPO" log -1 >/dev/null 2>&1; then
  echo "FAIL: No commits found in the repository."
  exit 1
fi

# Check that working tree has no uncommitted tracked files
if [ -n "$(git -C "$REPO" status --porcelain | grep -v 'temp.tmp')" ]; then
  echo "FAIL: There are uncommitted modifications to index.html or .gitignore. Ensure status is clean."
  exit 1
fi

echo "PASS: Repository initialized, .gitignore configured, index.html added and committed successfully."
