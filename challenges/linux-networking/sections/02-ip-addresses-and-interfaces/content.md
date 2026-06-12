## IP Addresses and Network Interfaces

In Linux, hardware and virtual network cards are represented as **network interfaces**. We interact with these interfaces using modern kernel command utilities.

---

## 1. Network Interface Names

- **`lo` (Loopback)**: A virtual interface used by the system to connect to itself (associated with IP `127.0.0.1`).
- **`eth0` / `enp3s0` (Ethernet)**: Wired network interfaces.
- **`wlan0` / `wlp2s0` (Wireless)**: Wi-Fi network interfaces.

---

## 2. Querying Interfaces with `ip`

The modern utility to query and configure network interfaces is the `ip` tool (replacing the legacy `ifconfig` command).

- **List all interfaces and IP addresses**:
  ```bash
  ip addr
  # or
  ip a
  ```
- **List status of a specific interface**:
  ```bash
  ip addr show eth0
  ```
- **Show routing table (default gateway)**:
  ```bash
  ip route show
  # Output: default via 192.168.1.1 dev eth0
  ```
  *(The default route `dev eth0` indicates that `eth0` is the active interface connected to the default gateway).*

---

## Lab Tasks

### Task 1: Check your active IP address
1. Start the lab in your terminal:
   ```bash
   tld start lnx-check-ip-address
   ```
2. Query the system to find the primary IPv4 address of your active network interface (do not select `127.0.0.1` loopback).
3. Save that exact IP address string on a single line to a file named `ip_address.txt` inside a new directory named `network-test` in your home directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Identify the active interface
1. Start the lab in your terminal:
   ```bash
   tld start lnx-identify-active-interface
   ```
2. Look up the default routing information to identify the active network interface device name.
3. Save that interface name (e.g., `eth0` or `enp0s3`) on a single line to a file named `active_interface.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
