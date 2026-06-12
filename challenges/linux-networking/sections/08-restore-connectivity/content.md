## Restore Connectivity (Troubleshooting)

When applications fail to connect to external APIs, databases, or local microservices, administrators follow a systematic network troubleshooting workflow.

---

## 1. Network Troubleshooting Workflow

1. **Verify Interface Status**: Check if the interface is up and has a valid IP address (`ip link` / `ip addr`).
2. **Test Gateway Routing**: Ping the local gateway to verify connection to the local network router (`ip route` / `ping`).
3. **Check DNS Resolution**: Run `nslookup` or `dig` to verify host names are resolving.
4. **Test Service Port Access**: Check if the destination port is open and listening (`telnet` / `nc -zv`).

---

## 2. Static Name Resolution (`/etc/hosts`)

Before querying external DNS servers, the operating system checks `/etc/hosts` to resolve hostname lookups. This file allows you to map custom domain names to local or remote IP addresses.

The syntax for `/etc/hosts` is simple:
```
IP_address hostname [aliases]
```

- **Example**: Map `my-local-server.dev` to localhost:
  ```
  127.0.0.1 my-local-server.dev
  ```
  *(Now pinging `my-local-server.dev` will resolve immediately to loopback `127.0.0.1` without querying external DNS servers).*

---

## Lab Tasks

### Task 1: Map an internal domain name
1. Start the lab in your terminal:
   ```bash
   tld start lnx-debug-network-outage
   ```
2. A client application is attempting to connect to a service at `broken.devlab.local` but fails due to a resolution error.
3. Fix the resolution outage by mapping the hostname `broken.devlab.local` to the loopback IP address `127.0.0.1` inside your static hostname resolution file `/etc/hosts`.
4. Verify the task:
   ```bash
   tld check
   ```
