## Service Unreachable

When deploying microservices or multi-container stacks, one container often needs to call an API or database in another. If the connection fails with "Connection Refused" or "Host Unreachable", you are likely dealing with network isolation.

---

### The Default Network vs. Custom Bridges

By default, standalone containers launched with `docker run` are attached to the default bridge network (`bridge`). While they can communicate via IP address, they **cannot resolve each other by name (DNS resolution)**.

In contrast, containers in a custom user-defined network:
1. Support automatic service discovery (DNS name resolution).
2. Are securely isolated from other bridges.

If a `web` container needs to talk to a `db` container, both MUST be connected to the exact same user-defined network. If they reside on different networks, they cannot establish direct IP connections.

---

## Lab Tasks

### Task 1: Restore service connectivity
1. Start the task:
   ```bash
   tld start dkr-restore-service-connectivity
   ```
2. Navigate to `~/docker-troubleshooting/connectivity/`.
3. You will find a `docker-compose.yml` file where:
   - `web` is on network `web-net`
   - `db` is on network `db-net`
   - Because they are on separate networks, the web application cannot connect to the database.
4. Edit the `docker-compose.yml` to put both services on the same network (you can use an existing network or define a new one).
5. Run `docker compose up -d` to restart the stack.
6. Verify the solution:
   ```bash
   tld check
   ```
