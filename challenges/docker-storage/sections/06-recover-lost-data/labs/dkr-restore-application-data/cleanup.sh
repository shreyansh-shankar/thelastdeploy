#!/bin/bash
# cleanup.sh — docker-storage / 06-recover-lost-data / dkr-restore-application-data
echo "Removing restored-db-vol volume..."
docker volume rm -f restored-db-vol || true
echo "Removing temporary directory..."
rm -rf "$HOME/docker-restore-source"
echo "Cleanup completed!"
