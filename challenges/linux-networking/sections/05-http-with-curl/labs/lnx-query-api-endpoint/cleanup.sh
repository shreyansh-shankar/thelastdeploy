#!/bin/bash
# Auto-generated cleanup script

echo "Stopping process matching python3..."
pkill -f 'python3' || true

echo "Removing directory $HOME/network-test..."
rm -rf "$HOME/network-test"

echo "Cleanup completed!"
