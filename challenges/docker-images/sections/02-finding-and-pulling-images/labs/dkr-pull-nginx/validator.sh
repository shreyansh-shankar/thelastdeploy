#!/bin/bash
# validator.sh — docker-images / 02-finding-and-pulling-images / dkr-pull-nginx
set -euo pipefail

if ! docker image inspect nginx:latest >/dev/null 2>&1; then
  echo "FAIL: nginx:latest image not found locally. Did you run 'docker pull nginx'?"
  exit 1
fi

echo "PASS: Successfully pulled nginx:latest image."
exit 0
