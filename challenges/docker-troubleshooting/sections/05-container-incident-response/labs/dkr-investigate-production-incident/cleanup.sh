#!/bin/bash
# cleanup.sh — docker-troubleshooting / 05-container-incident-response / dkr-investigate-production-incident
docker compose -f "$HOME/docker-troubleshooting/incident/docker-compose.yml" down -v || true
rm -rf "$HOME/docker-troubleshooting/incident"
echo "Cleanup complete."
