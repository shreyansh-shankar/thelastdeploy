## Restore Connectivity

In production, misconfigured networks or containers connected to the wrong driver (like `none`) can sever communication entirely, crashing web services. Resolving these requires diagnostic skills and knowledge of network commands.

---

## 1. Network Diagnostics

When troubleshooting network connectivity issues:

1. **Verify network list**: Run `docker network ls` to inspect available interfaces.
2. **Inspect container networks**: Run `docker inspect <container>` and look at `NetworkSettings.Networks`. If you see only `none` or empty mappings, the container is disconnected.
3. **Connect dynamically**: Use `docker network connect <network> <container>` to bridge it back to the required network workspace.

---

## Lab Tasks

### Task 1: Fix broken container network
1. Start the lab in your terminal:
   ```bash
   tld start dkr-fix-broken-container-network
   ```
2. A running container named `broken-web` was supposed to serve a website inside the custom network `web-net`.
3. However, `broken-web` is currently isolated (using the `none` network driver) and cannot talk to `web-net`.
4. Restore connectivity. Attach `broken-web` to the `web-net` custom network.
5. Verify the task:
   ```bash
   tld check
   ```
