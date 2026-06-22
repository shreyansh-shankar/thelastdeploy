#!/bin/bash
# cleanup.sh — docker-images / 06-build-custom-web-server / dkr-build-custom-nginx-site
echo "Cleaning up web server image and files..."
docker rmi -f my-nginx-web:latest || true
rm -rf "$HOME/docker-build/nginx-custom"
echo "Cleanup completed!"
