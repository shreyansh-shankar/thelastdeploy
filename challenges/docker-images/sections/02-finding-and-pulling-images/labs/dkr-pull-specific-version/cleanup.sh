#!/bin/bash
# cleanup.sh — docker-images / 02-finding-and-pulling-images / dkr-pull-specific-version
echo "Cleaning up nginx:1.21.6 image..."
docker rmi -f nginx:1.21.6 || true
echo "Cleanup completed!"
