#!/bin/bash
# validator.sh — linux-networking / 08-restore-connectivity / lnx-debug-network-outage
set -euo pipefail

# Query hostname databases/getent for broken.devlab.local mapping
RESOLVED_IP=$(getent hosts broken.devlab.local | awk '{print $1}' | head -n 1 || true)

if [ -z "$RESOLVED_IP" ]; then
  echo "FAIL: Hostname 'broken.devlab.local' does not resolve. Please add it to your /etc/hosts file."
  exit 1
fi

if [ "$RESOLVED_IP" != "127.0.0.1" ]; then
  echo "FAIL: Hostname 'broken.devlab.local' resolves to '$RESOLVED_IP'. It must be mapped to '127.0.0.1'."
  exit 1
fi

echo "PASS: Static hostname resolution correctly configured in /etc/hosts."
exit 0
