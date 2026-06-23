#!/bin/bash
# cleanup.sh — docker-storage / 04-inspecting-storage / dkr-find-volume-usage
echo "Removing analytics-app container..."
docker rm -f analytics-app || true
echo "Removing analytics-vol volume..."
docker volume rm -f analytics-vol || true
echo "Removing temporary files..."
rm -rf "$HOME/docker-test"
echo "Cleanup completed!"
