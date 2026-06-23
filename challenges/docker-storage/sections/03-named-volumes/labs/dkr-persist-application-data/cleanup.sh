#!/bin/bash
# cleanup.sh — docker-storage / 03-named-volumes / dkr-persist-application-data
echo "Stopping and removing db-containers..."
docker rm -f db-container db-container-new || true
echo "Removing db-storage-vol volume..."
docker volume rm -f db-storage-vol || true
echo "Cleanup completed!"
