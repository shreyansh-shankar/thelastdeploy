#!/bin/bash
# cleanup.sh — docker-troubleshooting / 02-container-wont-start / dkr-fix-startup-failure
docker rm -f host-port-occupier nginx-service || true
echo "Cleanup complete."
