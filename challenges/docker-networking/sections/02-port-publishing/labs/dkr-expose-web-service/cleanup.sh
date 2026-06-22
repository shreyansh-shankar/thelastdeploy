#!/bin/bash
# cleanup.sh — docker-networking / 02-port-publishing / dkr-expose-web-service
echo "Removing web-service container..."
docker rm -f web-service || true
echo "Cleanup completed!"
