#!/bin/bash
# cleanup.sh — docker-troubleshooting / 03-service-unreachable / dkr-restore-service-connectivity
docker compose -f "$HOME/docker-troubleshooting/connectivity/docker-compose.yml" down -v || true
rm -rf "$HOME/docker-troubleshooting/connectivity"
echo "Cleanup complete."
