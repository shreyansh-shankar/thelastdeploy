#!/bin/bash
# cleanup.sh — docker-networking / 03-container-to-container / dkr-debug-connection-failure
echo "Removing containers..."
docker rm -f backend-service client-app || true

echo "Removing network..."
docker network rm debug-net || true

echo "Removing test files..."
rm -f "$HOME/docker-test/debug_output.txt"

echo "Cleanup completed!"
