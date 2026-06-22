#!/bin/bash
# cleanup.sh — docker-networking / 03-container-to-container / dkr-connect-two-containers
echo "Removing containers..."
docker rm -f server-target client-source || true

echo "Removing network..."
docker network rm lab-net || true

echo "Removing test files..."
rm -f "$HOME/docker-test/fetched_page.txt"

echo "Cleanup completed!"
