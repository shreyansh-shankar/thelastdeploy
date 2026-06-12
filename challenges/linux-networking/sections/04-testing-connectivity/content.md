## Testing Connectivity (ping and traceroute)

Before configuring complex application connections, administrators run basic connectivity checks to test network paths, latency, and packet transmission reliability.

---

## 1. Checking Host Status (`ping`)

The `ping` command uses **ICMP (Internet Control Message Protocol)** packets to send an Echo Request to a target host and waits for an Echo Reply.
- **Continuous ping**: By default, `ping` runs indefinitely on Linux until stopped with `Ctrl+C`.
- **Limiting count (`-c`)**:
  ```bash
  ping -c 4 127.0.0.1
  ```
  *(Sends exactly 4 packets and prints stats, showing average round-trip time and packet loss).*

---

## 2. Tracking Hops (`traceroute` / `tracepath`)

- **traceroute**: Sends packets with increasing **TTL (Time to Live)** fields. Each router along the path decrements TTL; when it hits 0, the router returns an ICMP Time Exceeded message, revealing its IP address.
  ```bash
  traceroute 127.0.0.1
  ```
- **tracepath**: Similar to `traceroute` but does not require root/sudo permissions and tracks path MTU (Maximum Transmission Unit).
  ```bash
  tracepath 127.0.0.1
  ```

---

## Lab Tasks

### Task 1: Check loopback response with ping
1. Start the lab in your terminal:
   ```bash
   tld start lnx-ping-host
   ```
2. Run a `ping` command targeting your local loopback address (`127.0.0.1`) that transmits **exactly** 4 packets and exits automatically.
3. Save the exact command you executed on a single line to a file named `ping_cmd.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Trace network hops
1. Start the lab in your terminal:
   ```bash
   tld start lnx-diagnose-network-path
   ```
2. Execute a command to trace the routing hops or network path to your local loopback address (`127.0.0.1`).
3. Save the command you executed on a single line to a file named `trace_cmd.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
