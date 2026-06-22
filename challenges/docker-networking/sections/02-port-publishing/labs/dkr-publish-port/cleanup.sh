#!/bin/bash
# cleanup.sh — docker-networking / 02-port-publishing / dkr-publish-port
echo "Removing static-web container..."
docker rm -f static-web || true
echo "Cleanup completed!"
