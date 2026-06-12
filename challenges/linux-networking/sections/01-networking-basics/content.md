## Networking Basics

A network allows computers (hosts) to exchange data. In a Linux-centric DevOps or administration workspace, understanding networking is essential for configuring servers, deploying microservices, and debugging connectivity problems.

---

## 1. IP Addresses, Subnets, and Gateways

- **IP Address (Internet Protocol)**: A unique numerical identifier assigned to every device connected to a network.
  - *IPv4*: 32-bit addresses written in dotted-decimal format (e.g. `192.168.1.50`).
  - *IPv6*: 128-bit addresses written in hexadecimal format (e.g. `2001:db8::ff00:42:8329`).
- **Subnet Mask**: Defines which part of an IP address belongs to the network portion and which part belongs to the host portion (e.g., `255.255.255.0` or `/24` CIDR notation).
- **Default Gateway**: The routing device (router) that a host sends packets to when the destination IP address lies outside the local subnet.

---

## 2. Ports and Sockets

While an IP address directs packets to a specific host on a network, a **Port** directs those packets to a specific program or service running on that host.
- **Port Numbers**: Ranging from `0` to `65535`.
  - *Well-Known Ports (0–1023)*: Reserved for standard system services (e.g. HTTP on `80`, HTTPS on `443`, SSH on `22`).
  - *Registered Ports (1024–49151)*: Assigned to specific applications (e.g. PostgreSQL on `5432`).
  - *Dynamic/Private Ports (49152–65535)*: Used temporarily by client applications.
- **Network Socket**: The combination of an IP address and a Port number (e.g., `127.0.0.1:80`), representing one end of a two-way communication link.

---

## 3. TCP vs UDP Protocols

- **TCP (Transmission Control Protocol)**: A connection-oriented protocol that guarantees delivery, ordering, and integrity of packets (used for HTTP, SSH, database connections).
- **UDP (User Datagram Protocol)**: A connectionless protocol that sends packets quickly without validating receipt or order (used for DNS queries, video streaming, gaming).

---

## Summary

Now that you understand the base concepts, proceed to the next section to learn how to inspect network interfaces and find active IP addresses on your system.
