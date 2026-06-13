#!/bin/bash
echo "Stopping and removing container tld-my-web-app..."
docker rm -f tld-my-web-app || true

echo "Removing image my-web-app:latest..."
docker rmi -f my-web-app:latest || true

echo "Cleanup completed!"
