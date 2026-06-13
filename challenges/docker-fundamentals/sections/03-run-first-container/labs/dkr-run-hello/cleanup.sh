#!/bin/bash
echo "Cleaning up hello-world containers..."
docker rm -f $(docker ps -a -q --filter ancestor=hello-world) || true
echo "Cleanup completed!"
