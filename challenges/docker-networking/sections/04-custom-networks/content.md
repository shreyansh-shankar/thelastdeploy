## Custom Networks

To build robust, isolated microservices, Docker allows you to create your own user-defined networks. Containers on these custom networks benefit from name-based DNS lookup and network isolation.

---

## 1. Creating Custom Networks (`docker network create`)

You can create a custom network using the `docker network create` command. By default, this creates a **bridge** network:

```bash
docker network create my-custom-net
```

### Useful CLI Commands
* **List networks**:
  ```bash
  docker network ls
  ```
* **Inspect network details**:
  ```bash
  docker network inspect my-custom-net
  ```
* **Remove network**:
  ```bash
  docker network rm my-custom-net
  ```

---

## 2. Attaching and Detaching Containers

You can connect a running container to a network on the fly without restarting it:

```bash
docker network connect my-custom-net my-running-container
```

To disconnect:
```bash
docker network disconnect my-custom-net my-running-container
```

---

## Lab Tasks

### Task 1: Attach container to network
1. Start the lab in your terminal:
   ```bash
   tld start dkr-attach-container-network
   ```
2. A running container named `isolated-app` and a custom network named `production-net` are available on your host.
3. Attach the container `isolated-app` to the `production-net` network.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Create a bridge network
1. Start the lab in your terminal:
   ```bash
   tld start dkr-create-bridge-network
   ```
2. Create a user-defined bridge network named `custom-bridge-net`.
3. Verify the task:
   ```bash
   tld check
   ```
