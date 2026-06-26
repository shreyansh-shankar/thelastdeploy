## Container Won't Start

One of the most frustrating Docker issues is when a container fails to start entirely or exits immediately. Common causes include:
1. **Entrypoint Script Failures**: Missing files, syntax errors, or incorrect script execute permissions.
2. **Address Already In Use**: The host port you are mapping to is already occupied by another running process or container.
3. **Resource Exhaustion**: The container gets OOM (Out Of Memory) killed immediately upon launch.

---

### Port Collisions

When you launch a container with a port binding, e.g., `-p 80:80`, the Docker daemon attempts to bind to port 80 on the host machine. If another container or service (like apache/nginx running natively) is already listening on that port, you will receive an error:
`docker: Error response from daemon: driver failed programming external connectivity on endpoint ... Bind for 0.0.0.0:80 failed: port is already allocated.`

To troubleshoot:
1. Find what container is occupying the port:
   ```bash
   docker ps --filter "publish=PORT"
   ```
2. Or locate native processes occupying the port:
   ```bash
   sudo lsof -i :PORT
   ```
3. Stop or remove the occupying container or change your host port mapping.

---

## Lab Tasks

### Task 1: Fix container startup failure (port collision)
1. Start the task:
   ```bash
   tld start dkr-fix-startup-failure
   ```
2. A background container named `host-port-occupier` is running and occupying host port `8084`.
3. Try to run a container named `nginx-service` using the image `nginx:alpine` and mapping host port `8084` to container port `80`. It will fail because the port is already allocated.
4. Stop and remove the blocking container (`host-port-occupier`).
5. Run the new container `nginx-service` on port `8084:80`.
6. Verify the solution:
   ```bash
   tld check
   ```
