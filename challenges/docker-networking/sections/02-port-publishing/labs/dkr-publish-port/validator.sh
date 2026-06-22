#!/bin/bash
# validator.sh — docker-networking / 02-port-publishing / dkr-publish-port
set -euo pipefail

# Check if container static-web exists and is running
if ! docker ps --filter name=static-web --format '{{.Names}}' | grep -q "static-web"; then
  echo "FAIL: Container 'static-web' not found running."
  exit 1
fi

# Check port mapping details
PORT_IP=$(docker inspect static-web --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostIp}}' 2>/dev/null || echo "")
PORT_NUM=$(docker inspect static-web --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' 2>/dev/null || echo "")

if [ "$PORT_IP" != "127.0.0.1" ]; then
  echo "FAIL: Port is not restricted to localhost interface (127.0.0.1). Got host IP: '$PORT_IP'"
  exit 1
fi

if [ "$PORT_NUM" != "8089" ]; then
  echo "FAIL: Port is not mapped to host port 8089. Got host port: '$PORT_NUM'"
  exit 1
fi

echo "PASS: Successfully published port on loopback interface."
exit 0
