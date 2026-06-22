#!/bin/bash
# cleanup.sh — docker-networking / 05-restore-connectivity / dkr-fix-broken-container-network
echo "Removing broken-web container..."
docker rm -f broken-web || true

echo "Removing web-net network..."
docker network rm web-net || true

echo "Cleanup completed!"
