## Container-to-Container Communication

Containers frequently need to talk to other containers on the same host (e.g. a web application backend talking to a database or a caching daemon).

---

## 1. Network Namespaces and Communication

When containers are launched on the same Docker network, they are assigned private IP addresses in that network segment (e.g. `172.18.0.2` and `172.18.0.3`). They can communicate directly using these IPs.

However, container IPs are ephemeral — they can change if a container is restarted or recreated. To establish reliable communication, we must use **hostnames** instead of IPs.

---

## 2. DNS Resolution on Custom Networks

Docker provides built-in automatic **DNS resolution** for containers, but **only on user-defined networks**.

If you connect two containers `web-app` and `db-server` to a custom bridge network named `app-net`:
1. `web-app` can make requests to `http://db-server:5432` directly.
2. Docker's embedded DNS server will automatically resolve the name `db-server` to its correct private IP address.

*(Note: Name resolution does NOT work in the default bridge network `docker0`).*

---

## Lab Tasks

### Task 1: Connect two containers
1. Start the lab in your terminal:
   ```bash
   tld start dkr-connect-two-containers
   ```
2. A custom bridge network named `lab-net` has been pre-created. Two containers are running in it:
   - `server-target` (an Nginx server on port 80)
   - `client-source` (a simple Alpine shell container)
3. Execute a `curl` request from **inside** `client-source` to fetch the homepage of `server-target` using its container name hostname (`server-target`).
4. Save the command output (the HTML response) to a file named `fetched_page.txt` inside your `~/docker-test/` directory on the host.
   *Hint: You can use `docker exec client-source curl -s http://server-target` to request the homepage and redirect the output to the target file on the host.*
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Debug connection failure
1. Start the lab in your terminal:
   ```bash
   tld start dkr-debug-connection-failure
   ```
2. Two containers have been started:
   - `backend-service` (running on custom network `debug-net`)
   - `client-app` (running on the default `bridge` network)
3. Because they are on different networks, `client-app` cannot resolve or reach `backend-service`.
4. Fix this connection issue by attaching `client-app` to the `debug-net` custom network using `docker network connect`.
5. Once connected, execute a `curl` command inside `client-app` to fetch the homepage of `backend-service` (`http://backend-service:80`), and save the HTML response to a file named `debug_output.txt` inside your `~/docker-test/` directory on the host.
6. Verify the task:
   ```bash
   tld check
   ```
