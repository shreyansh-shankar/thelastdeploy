#!/bin/bash
# Auto-generated cleanup script

echo "Stopping process matching mem_hog_process..."
pkill -f 'mem_hog_process' || true

echo "Removing directory $HOME/process-test..."
rm -rf "$HOME/process-test"

echo "Cleanup completed!"
