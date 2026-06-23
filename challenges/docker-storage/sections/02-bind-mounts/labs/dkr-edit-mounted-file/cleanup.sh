#!/bin/bash
# cleanup.sh — docker-storage / 02-bind-mounts / dkr-edit-mounted-file
echo "Stopping and removing notes-viewer container..."
docker rm -f notes-viewer || true
echo "Removing temporary directory..."
rm -rf "$HOME/docker-mount-test"
echo "Cleanup completed!"
