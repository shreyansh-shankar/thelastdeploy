#!/bin/bash
# cleanup.sh — docker-troubleshooting / 01-reading-docker-errors / dkr-identify-startup-error
docker rm -f crashing-app || true
rm -rf "$HOME/docker-troubleshooting/errors"
echo "Cleanup complete."
