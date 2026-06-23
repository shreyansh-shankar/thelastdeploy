#!/bin/bash
# validator.sh — docker-storage / 03-named-volumes / dkr-create-volume
set -euo pipefail

# Check if volume exists
if ! docker volume inspect app-data-vol >/dev/null 2>&1; then
  echo "FAIL: Named volume 'app-data-vol' not found."
  exit 1
fi

echo "PASS: Successfully created named volume 'app-data-vol'."
exit 0
