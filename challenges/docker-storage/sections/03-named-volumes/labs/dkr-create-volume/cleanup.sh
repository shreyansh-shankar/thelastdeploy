#!/bin/bash
# cleanup.sh — docker-storage / 03-named-volumes / dkr-create-volume
echo "Removing app-data-vol named volume..."
docker volume rm -f app-data-vol || true
echo "Cleanup completed!"
