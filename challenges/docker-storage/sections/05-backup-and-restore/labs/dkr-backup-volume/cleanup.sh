#!/bin/bash
# cleanup.sh — docker-storage / 05-backup-and-restore / dkr-backup-volume
echo "Removing prod-db-vol volume..."
docker volume rm -f prod-db-vol || true
echo "Removing temporary directory..."
rm -rf "$HOME/docker-backup"
echo "Cleanup completed!"
