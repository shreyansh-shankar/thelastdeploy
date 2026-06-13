#!/bin/bash
# Auto-generated cleanup script

echo "Stopping and disabling user service devlab-broken..."
systemctl --user stop devlab-broken.service || true
systemctl --user disable devlab-broken.service || true
rm -f "$HOME/.config/systemd/user/devlab-broken.service"
systemctl --user daemon-reload

echo "Cleanup completed!"
