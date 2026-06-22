#!/bin/bash
# cleanup.sh — docker-images / 02-finding-and-pulling-images / dkr-pull-nginx
echo "Cleaning up nginx images..."
docker rmi -f nginx nginx:latest || true
echo "Cleanup completed!"
