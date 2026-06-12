#!/bin/bash
# validator.sh — linux-networking / 07-ssh / lnx-passwordless-login
set -euo pipefail

# Try executing a passwordless SSH connection to localhost in BatchMode
if ! ssh -o BatchMode=yes -o StrictHostKeyChecking=no localhost true &>/dev/null; then
  echo "FAIL: Passwordless SSH connection to localhost failed. Did you append your public key to ~/.ssh/authorized_keys?"
  exit 1
fi

echo "PASS: Passwordless SSH login to localhost configured successfully."
exit 0
