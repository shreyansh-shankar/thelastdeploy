#!/bin/bash
set -euo pipefail

REPO_DIR="$HOME/git-challenge"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "FAIL: Git repository not initialized inside $REPO_DIR (missing .git directory)."
  exit 1
fi

echo "PASS: Git repository initialized successfully in $REPO_DIR."
