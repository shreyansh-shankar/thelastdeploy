#!/bin/bash
# validator.sh — linux-networking / 02-ip-addresses-and-interfaces / lnx-check-ip-address
set -euo pipefail

TARGET_FILE="$HOME/network-test/ip_address.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

SUBMITTED_IP=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ -z "$SUBMITTED_IP" ]; then
  echo "FAIL: File is empty."
  exit 1
fi

if [ "$SUBMITTED_IP" = "127.0.0.1" ]; then
  echo "FAIL: Loopback address (127.0.0.1) is not accepted. Please identify your active external IP."
  exit 1
fi

# Retrieve all configured IPv4 addresses on the host
SYSTEM_IPS=$(ip -o -4 addr show | awk '{print $4}' | cut -d/ -f1 || hostname -I)

FOUND=false
for ip in $SYSTEM_IPS; do
  if [ "$ip" = "$SUBMITTED_IP" ]; then
    FOUND=true
    break
  fi
done

if [ "$FOUND" = false ]; then
  echo "FAIL: The IP address '$SUBMITTED_IP' is not configured on any active interface of this host."
  echo "Active host IPs are: $SYSTEM_IPS"
  exit 1
fi

echo "PASS: Active IP address verified successfully."
exit 0
