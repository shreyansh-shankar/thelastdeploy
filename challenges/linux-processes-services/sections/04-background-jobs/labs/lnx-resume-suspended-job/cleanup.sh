#!/bin/bash
# Auto-generated cleanup script

echo "Stopping process matching suspended_job..."
pkill -f 'suspended_job' || true

echo "Cleanup completed!"
