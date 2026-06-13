#!/bin/bash
# Auto-generated cleanup script

echo "Stopping and disabling user service devlab-logger..."
systemctl --user stop devlab-logger.service || true
systemctl --user disable devlab-logger.service || true
rm -f "$HOME/.config/systemd/user/devlab-logger.service"
systemctl --user daemon-reload

echo "Removing directory $HOME/logs-test..."
rm -rf "$HOME/logs-test"

echo "Cleanup completed!"
