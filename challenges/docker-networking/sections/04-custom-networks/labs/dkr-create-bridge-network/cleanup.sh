#!/bin/bash
# cleanup.sh — docker-networking / 04-custom-networks / dkr-create-bridge-network
echo "Removing custom-bridge-net network..."
docker network rm custom-bridge-net || true
echo "Cleanup completed!"
