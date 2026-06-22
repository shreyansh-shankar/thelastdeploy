#!/bin/bash
# cleanup.sh — docker-fundamentals / 04-container-lifecycle / dkr-remove-container
echo "Removing old-trash-container container if it exists..."
docker rm -f old-trash-container || true
echo "Cleanup completed!"
