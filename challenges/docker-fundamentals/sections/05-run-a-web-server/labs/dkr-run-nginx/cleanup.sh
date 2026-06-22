#!/bin/bash
# cleanup.sh — docker-fundamentals / 05-run-a-web-server / dkr-run-nginx
echo "Removing my-nginx-server container..."
docker rm -f my-nginx-server || true
echo "Cleanup completed!"
