#!/bin/bash
# cleanup.sh — docker-fundamentals / 02-images-vs-containers / dkr-identify-image-and-container

echo "Removing ident-target-container container..."
docker rm -f ident-target-container || true

echo "Removing test files..."
rm -f "$HOME/docker-test/image_id.txt" "$HOME/docker-test/container_id.txt"

echo "Cleanup completed!"
