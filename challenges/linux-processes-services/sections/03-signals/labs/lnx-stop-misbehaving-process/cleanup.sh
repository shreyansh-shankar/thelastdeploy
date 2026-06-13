#!/bin/bash
# Auto-generated cleanup script

echo "Stopping process matching bad_process..."
pkill -f 'bad_process' || true

echo "Cleanup completed!"
