## DNS Basics (nslookup and dig)

The **DNS (Domain Name System)** translates human-readable domain names (like `google.com`) into computer-readable IP addresses (like `8.8.8.8`). This lookup happens behind the scenes for almost every network connection.

---

## 1. Domain Name Resolution

When a program requests a domain lookup, Linux:
1. Checks the local static hosts table at `/etc/hosts`.
2. Queries the local caching resolver or DNS servers configured in `/etc/resolv.conf`.

---

## 2. Testing DNS Queries with `nslookup`

The `nslookup` utility queries DNS servers interactively or non-interactively.
```bash
nslookup google.com
# Output:
# Server:		127.0.0.53
# Address:	127.0.0.53#53
# Non-authoritative answer:
# Name:	google.com
# Address: 142.250.190.46
```

---

## 3. Advanced DNS Diagnostics (`dig`)

The `dig` (domain information groper) utility is the modern, preferred tool for DNS lookups because it displays comprehensive raw DNS answer blocks.

- **Perform standard A record lookup**:
  ```bash
  dig google.com
  ```
- **Query specific record type (e.g. TXT, MX)**:
  ```bash
  dig MX google.com
  ```
- **Short answer format (`+short`)**:
  ```bash
  dig google.com +short
  # Output: 142.250.190.46
  ```

---

## Lab Tasks

### Task 1: Resolve a domain name local mapping
1. Start the lab in your terminal:
   ```bash
   tld start lnx-resolve-domain
   ```
2. Query the DNS resolution system (or host lookup databases) on this machine to find the IPv4 loopback address associated with the standard hostname `localhost`.
3. Save that IP address (exactly `127.0.0.1`) on a single line to a file named `resolved_dns.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
