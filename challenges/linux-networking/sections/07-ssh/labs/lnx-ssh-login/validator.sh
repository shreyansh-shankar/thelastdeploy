#!/bin/bash
# validator.sh — linux-networking / 07-ssh / lnx-ssh-login
set -euo pipefail

SSH_DIR="$HOME/.ssh"

if [ ! -d "$SSH_DIR" ]; then
  echo "FAIL: SSH directory $SSH_DIR not found."
  exit 1
fi

# Find any public key matching id_*.pub
PUB_KEY=$(find "$SSH_DIR" -maxdepth 1 -name "id_*.pub" | head -n 1)

if [ -z "$PUB_KEY" ]; then
  echo "FAIL: No SSH public key files (e.g. id_rsa.pub or id_ed25519.pub) found in $SSH_DIR."
  exit 1
fi

# Check key prefix format
PREFIX=$(awk '{print $1}' "$PUB_KEY" || true)

if [[ ! "$PREFIX" =~ ^ssh- ]]; then
  echo "FAIL: Public key file $PUB_KEY does not start with standard 'ssh-' prefix."
  exit 1
fi

echo "PASS: SSH key pair successfully generated."
exit 0
