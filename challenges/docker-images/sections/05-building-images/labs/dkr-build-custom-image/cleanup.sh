#!/bin/bash
# cleanup.sh — docker-images / 05-building-images / dkr-build-custom-image
echo "Cleaning up custom image and files..."
docker rmi -f my-custom-app:v1.0 || true
rm -rf "$HOME/docker-build/custom-app"
echo "Cleanup completed!"
