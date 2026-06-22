#!/bin/bash
# cleanup.sh — docker-fundamentals / 05-run-a-web-server / dkr-access-web-container
echo "Removing secret-web container..."
docker rm -f secret-web || true

echo "Removing test files..."
rm -f "$HOME/docker-test/web_status.txt"

echo "Cleanup completed!"
