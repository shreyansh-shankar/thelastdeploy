#!/bin/bash
# cleanup.sh — docker-images / 04-writing-a-dockerfile / dkr-create-first-dockerfile
echo "Cleaning up temporary image and files..."
docker rmi -f test-first-df || true
rm -rf "$HOME/docker-build/first-dockerfile"
echo "Cleanup completed!"
