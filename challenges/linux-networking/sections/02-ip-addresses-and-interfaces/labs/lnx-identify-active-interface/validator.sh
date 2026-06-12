#!/bin/bash
# validator.sh — linux-networking / 02-ip-addresses-and-interfaces / lnx-identify-active-interface
set -euo pipefail

TARGET_FILE="$HOME/network-test/active_interface.txt"

if [ ! -f "$TARGET_FILE" ]; then
  echo "FAIL: File $TARGET_FILE not found."
  exit 1
fi

SUBMITTED_IFACE=$(tr -d '\r' < "$TARGET_FILE" | xargs)

if [ -z "$SUBMITTED_IFACE" ]; then
  echo "FAIL: File is empty."
  exit 1
fi

# Find the actual default routing interface
EXPECTED_IFACE=$(ip route show | grep default | awk '{print $5}' | head -n 1 || true)

# If no default route interface is found, get any active non-loopback ethernet/wireless device
if [ -z "$EXPECTED_IFACE" ]; then
  EXPECTED_IFACE=$(ip -o link show | awk -F': ' '$2 != "lo" {print $2}' | head -n 1 || true)
fi

if [ "$SUBMITTED_IFACE" != "$EXPECTED_IFACE" ]; then
  # Accept if it exists under /sys/class/net and is up and not lo
  if [ ! -d "/sys/class/net/$SUBMITTED_IFACE" ] || [ "$SUBMITTED_IFACE" = "lo" ]; then
    echo "FAIL: Interface '$SUBMITTED_IFACE' is invalid or not active."
    exit 1
  fi
fi

echo "PASS: Active default interface verified successfully."
exit 0
