#!/bin/bash
# validator.sh — docker-networking / 03-container-to-container / dkr-connect-two-containers
set -euo pipefail

FILE="$HOME/docker-test/fetched_page.txt"

if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/docker-test/fetched_page.txt not found."
  exit 1
fi

if ! grep -q "Welcome to nginx!" "$FILE"; then
  echo "FAIL: Page fetched does not match Nginx landing page."
  exit 1
fi

echo "PASS: Containers successfully communicated via custom network DNS resolution."
exit 0
