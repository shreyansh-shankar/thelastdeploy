#!/bin/bash
# cleanup.sh — docker-networking / 04-custom-networks / dkr-attach-container-network
echo "Removing isolated-app container..."
docker rm -f isolated-app || true

echo "Removing production-net network..."
docker network rm production-net || true

echo "Cleanup completed!"
