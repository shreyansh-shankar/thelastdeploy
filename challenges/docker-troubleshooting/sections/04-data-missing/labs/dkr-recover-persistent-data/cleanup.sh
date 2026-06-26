#!/bin/bash
# cleanup.sh — docker-troubleshooting / 04-data-missing / dkr-recover-persistent-data
docker compose -f "$HOME/docker-troubleshooting/persistence/docker-compose.yml" down -v || true
rm -rf "$HOME/docker-troubleshooting/persistence"
echo "Cleanup complete."
