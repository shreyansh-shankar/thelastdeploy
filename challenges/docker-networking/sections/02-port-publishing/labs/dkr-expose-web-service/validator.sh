#!/bin/bash
# validator.sh — docker-networking / 02-port-publishing / dkr-expose-web-service
set -euo pipefail

# Check if container web-service exists and is running
if ! docker ps --filter name=web-service --format '{{.Names}}' | grep -q "web-service"; then
  echo "FAIL: Container 'web-service' not found running."
  exit 1
fi

# Check host port mapping: host port 8088 mapped to container port 80
PORT_MAPPED=$(docker inspect web-service --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' 2>/dev/null || echo "")

if [ "$PORT_MAPPED" != "8088" ]; then
  echo "FAIL: Container is not mapped to host port 8088. Got mapping: '$PORT_MAPPED'"
  exit 1
fi

echo "PASS: Web service exposed successfully on port 8088."
exit 0
