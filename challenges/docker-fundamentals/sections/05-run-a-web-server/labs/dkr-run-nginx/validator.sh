#!/bin/bash
# validator.sh — docker-fundamentals / 05-run-a-web-server / dkr-run-nginx
set -euo pipefail

# Check if the container my-nginx-server exists
if ! docker ps -a --filter name=my-nginx-server --format '{{.Names}}' | grep -q "my-nginx-server"; then
  echo "FAIL: Container 'my-nginx-server' not found."
  exit 1
fi

# Check if it is running
RUNNING=$(docker inspect my-nginx-server --format '{{.State.Running}}')

if [ "$RUNNING" != "true" ]; then
  echo "FAIL: Container 'my-nginx-server' is not running."
  exit 1
fi

# Check host port mapping: host port 8085 mapped to container port 80
PORT_MAPPED=$(docker inspect my-nginx-server --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' 2>/dev/null || echo "")

if [ "$PORT_MAPPED" != "8085" ]; then
  echo "FAIL: Container is not mapped to host port 8085. Got mapping: '$PORT_MAPPED'"
  exit 1
fi

echo "PASS: Nginx container started on port 8085 successfully."
exit 0
