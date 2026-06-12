## Ports and Sockets

To allow incoming client connections, server programs bind to a specific **Port** and listen for network traffic. Troubleshooting network services involves checking which ports are open and identifying which process owns those ports.

---

## 1. Finding Listening Ports (`ss` / `netstat`)

The `ss` (socket statistics) command is the modern tool used to dump socket statistics (replacing the legacy `netstat` utility).

- **Display all listening TCP ports (`-lt`)**:
  ```bash
  ss -lt
  # Output:
  # State    Recv-Q   Send-Q     Local Address:Port     Peer Address:Port
  # LISTEN   0        128            127.0.0.1:80             0.0.0.0:*
  ```
- **Display all listening TCP & UDP ports with Process names/PIDs (`-ltup`)**:
  ```bash
  # Requires sudo to view processes owned by other users
  sudo ss -ltup
  # Output:
  # LISTEN   0   128   127.0.0.1:80   0.0.0.0:*   users:(("nginx",pid=1420,fd=6))
  ```
  *(Flags breakdown: `l` = listening, `t` = TCP, `u` = UDP, `p` = process name).*

---

## 2. Listing Open Files and Sockets (`lsof`)

The `lsof` (list open files) utility treats network sockets as files.

- **Check which process is listening on a specific port**:
  ```bash
  sudo lsof -i :80
  # Output:
  # COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
  # nginx   1420   root    6u  IPv4  93731      0t0  TCP *:http (LISTEN)
  ```

---

## 3. The Services Database (`/etc/services`)

Linux maintains a standard mapping file `/etc/services` containing human-readable names mapped to their standard well-known port numbers:
```
ssh             22/tcp                          # SSH Remote Login Protocol
http            80/tcp          www             # WorldWideWeb HTTP
https           443/tcp                         # http protocol over TLS/SSL
```

---

## Lab Tasks

### Task 1: Locate an active local listener
1. Start the lab in your terminal:
   ```bash
   tld start lnx-find-open-port
   ```
2. The setup script started a custom background service listening on a specific port.
3. Locate this listening port number on your system.
4. Save the port number (e.g., `8080`) on a single line to a file named `open_port.txt` inside your `~/network-test` directory.
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Identify the listening process ID
1. Start the lab in your terminal:
   ```bash
   tld start lnx-identify-listening-process
   ```
2. The setup script started a custom service listening on port `9876`.
3. Locate this service on your system and identify the **Process ID (PID)** of the process holding that port open.
4. Save the PID number on a single line to a file named `listening_pid.txt` inside your `~/network-test` directory.
5. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Query the standard SSH service port
1. Start the lab in your terminal:
   ```bash
   tld start lnx-find-service-port
   ```
2. Search through the system service database `/etc/services` to find the default TCP port number reserved for SSH connections.
3. Save that port number (exactly `22`) on a single line to a file named `ssh_port.txt` inside your `~/network-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
