#!/bin/bash
# cleanup.sh — docker-fundamentals / 02-images-vs-containers / dkr-find-container-source-image

echo "Removing source-check-target container..."
docker rm -f source-check-target || true

echo "Removing ~/docker-test/source_image.txt..."
rm -f "$HOME/docker-test/source_image.txt"

echo "Cleanup completed!"
