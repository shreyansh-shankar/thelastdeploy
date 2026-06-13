#!/bin/bash
# Auto-generated cleanup script

echo "Stopping and disabling user service devlab-user..."
systemctl --user stop devlab-user.service || true
systemctl --user disable devlab-user.service || true
rm -f "$HOME/.config/systemd/user/devlab-user.service"
systemctl --user daemon-reload

echo "Cleanup completed!"
