#!/bin/bash
# cleanup.sh — docker-fundamentals / 04-container-lifecycle / dkr-start-stopped-container
echo "Removing stopped-sleeper container..."
docker rm -f stopped-sleeper || true
echo "Cleanup completed!"
