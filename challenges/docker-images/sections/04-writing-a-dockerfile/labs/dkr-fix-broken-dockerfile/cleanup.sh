#!/bin/bash
# cleanup.sh — docker-images / 04-writing-a-dockerfile / dkr-fix-broken-dockerfile
echo "Cleaning up temporary image and files..."
docker rmi -f test-fixed-df || true
rm -rf "$HOME/docker-build/broken-dockerfile"
echo "Cleanup completed!"
