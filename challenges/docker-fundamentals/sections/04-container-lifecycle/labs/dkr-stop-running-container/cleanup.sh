#!/bin/bash
# cleanup.sh — docker-fundamentals / 04-container-lifecycle / dkr-stop-running-container
echo "Removing runaway-container container..."
docker rm -f runaway-container || true
echo "Cleanup completed!"
