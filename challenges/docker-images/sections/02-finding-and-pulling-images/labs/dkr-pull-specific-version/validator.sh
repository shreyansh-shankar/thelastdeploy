#!/bin/bash
# validator.sh — docker-images / 02-finding-and-pulling-images / dkr-pull-specific-version
set -euo pipefail

if ! docker image inspect nginx:1.21.6 >/dev/null 2>&1; then
  echo "FAIL: nginx:1.21.6 image not found locally. Did you run 'docker pull nginx:1.21.6'?"
  exit 1
fi

echo "PASS: Successfully pulled nginx:1.21.6 image."
exit 0
