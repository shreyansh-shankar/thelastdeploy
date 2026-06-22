#!/bin/bash
# cleanup.sh — docker-fundamentals / 03-your-first-container / dkr-run-alpine-container

echo "Removing my-alpine-run container..."
docker rm -f my-alpine-run || true

echo "Cleanup completed!"
