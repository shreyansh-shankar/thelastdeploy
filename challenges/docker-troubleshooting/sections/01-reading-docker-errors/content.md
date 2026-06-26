## Reading Docker Errors

When containerized applications fail, they do not have a visual console. Understanding how to query and parse container runtime details is the key to Docker troubleshooting.

---

### 1. Retrieving Logs (`docker logs`)

The primary source of truth is stdout and stderr streams of the container:
```bash
docker logs <container_name_or_id>
```

Useful flags:
- `-f` (follow): Stream logs in real-time.
- `--tail N`: Show only the last N lines.
- `-t`: Show timestamps for each line.

---

### 2. Inspecting State (`docker inspect`)

To check why a container failed to start or crashed, inspect the state object:
```bash
docker inspect --format '{{.State.ExitCode}} {{.State.Error}}' <container_name>
```

An exit code of `137` typically indicates the container was terminated by the OOM (Out Of Memory) killer.

---

## Lab Tasks

### Task 1: Find startup error token
1. Start the lab:
   ```bash
   tld start dkr-identify-startup-error
   ```
2. A container named `crashing-app` ran but crashed immediately.
3. Inspect its log output or configuration to find the error code token (format: `ERR_TOKEN_XXXXX`).
4. Write this token to `~/docker-troubleshooting/errors/startup-token.txt`.
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Find network error port
1. Start the next lab:
   ```bash
   tld start dkr-identify-network-error
   ```
2. A client container named `api-client` failed to connect to a dependency.
3. Find the logs of `api-client` to determine what port number it attempted to connect to.
4. Save only this port number (e.g. `9999`) to `~/docker-troubleshooting/errors/network-port.txt`.
5. Verify the task:
   ```bash
   tld check
   ```
