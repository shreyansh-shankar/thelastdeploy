#!/bin/bash
# cleanup.sh — docker-storage / 02-bind-mounts / dkr-share-host-directory
echo "Stopping and removing nginx-mount container..."
docker rm -f nginx-mount || true
echo "Removing temporary directory..."
rm -rf "$HOME/docker-share"
echo "Cleanup completed!"
