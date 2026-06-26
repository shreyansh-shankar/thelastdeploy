#!/bin/bash
# validator.sh — docker-troubleshooting / 02-container-wont-start / dkr-fix-startup-failure
set -euo pipefail

# 1. Check that host-port-occupier is not running
if docker ps --format '{{.Names}}' | grep -q "host-port-occupier"; then
  echo "FAIL: Container 'host-port-occupier' is still running and blocking port 8084."
  exit 1
fi

# 2. Check that nginx-service exists and is running
if ! docker ps --format '{{.Names}}' | grep -q "nginx-service"; then
  echo "FAIL: Container 'nginx-service' is not running."
  exit 1
fi

# 3. Check port mapping for nginx-service on port 8084
PORT_MAPPED=$(docker inspect nginx-service --format '{{(index (index .NetworkSettings.Ports "80/tcp") 0).HostPort}}' 2>/dev/null || echo "")

if [ "$PORT_MAPPED" != "8084" ]; then
  echo "FAIL: Container 'nginx-service' is not mapped to host port 8084. Got: '$PORT_MAPPED'"
  exit 1
fi

echo "PASS: Resolved port collision and started nginx-service successfully."
exit 0
