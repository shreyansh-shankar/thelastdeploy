#!/bin/bash
# cleanup.sh — docker-fundamentals / 03-your-first-container / dkr-run-hello
echo "Cleaning up hello-world containers..."
docker rm -f $(docker ps -a -q --filter ancestor=hello-world) || true
echo "Cleanup completed!"
