#!/bin/bash
# cleanup.sh — docker-troubleshooting / 01-reading-docker-errors / dkr-identify-network-error
docker rm -f api-client || true
rm -rf "$HOME/docker-troubleshooting/errors"
echo "Cleanup complete."
