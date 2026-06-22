## Container Lifecycle

A Docker container passes through several states during its lifetime: Created, Running, Stopped, and Removed. Learning how to navigate and transition between these states is vital to managing resources efficiently.

---

## 1. Container States and Transition Commands

```
   `docker create`        `docker start`         `docker stop`
 [ Image ] -------> [ Stopped ] -------> [ Running ] -------> [ Stopped ]
                       |                                         |
                       | `docker rm`                             | `docker rm -f`
                       v                                         v
                  [ Deleted ]                               [ Deleted ]
```

* **docker stop <container>**: Sends a `SIGTERM` signal to the container's main process, allowing it to shut down gracefully. If it doesn't shut down within a timeout period (default 10s), it sends `SIGKILL`.
* **docker start <container>**: Starts an existing stopped container, preserving its file changes and configuration.
* **docker rm <container>**: Deletes a stopped container. To delete a running container, you must either stop it first or force-delete it using `docker rm -f`.

---

## 2. Listing Containers (`docker ps`)

* To see only currently **running** containers:
  ```bash
  docker ps
  ```
* To see **all** containers (running, exited, stopped):
  ```bash
  docker ps -a
  ```

---

## Lab Tasks

### Task 1: Remove a container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-remove-container
   ```
2. Your system has a stopped container named `old-trash-container`. Delete this container permanently.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Start a stopped container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-start-stopped-container
   ```
2. There is an existing stopped container named `stopped-sleeper` on your host. Start the container so that it runs in the background.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Stop a running container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-stop-running-container
   ```
2. A container named `runaway-container` is currently running. Stop it safely (do not delete or remove it).
3. Verify the task:
   ```bash
   tld check
   ```
