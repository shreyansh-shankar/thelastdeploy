## Run Your First Container

Now that Docker is installed, let's actually use it. In this section you'll pull an image and run a container — the two most fundamental Docker operations.

---

## Your First docker run

```bash
docker run hello-world
```

That's it. Docker will:

1. Look for the `hello-world` image locally — it won't find it
2. Pull it automatically from Docker Hub
3. Create a container from the image
4. Run it — the container prints a message and exits

You should see output like:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## What Just Happened?

```
docker run hello-world
  │       │
  │       └── image name (pulled from Docker Hub if not local)
  └── create and start a container
```

The container ran, printed its message, and exited. That's normal — containers run a process and stop when the process finishes.

---

## Useful Flags

```bash
# Run interactively with a terminal (great for exploring)
docker run -it ubuntu bash

# Run in the background (detached)
docker run -d nginx

# Give the container a name
docker run --name my-nginx -d nginx

# Map a port: host:container
docker run -p 8080:80 -d nginx
# Now visit http://localhost:8080
```

---

## Managing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a running container
docker stop <container-id-or-name>

# Remove a stopped container
docker rm <container-id-or-name>

# Remove a running container forcefully
docker rm -f <container-id-or-name>
```

---

## Managing Images

```bash
# List downloaded images
docker images

# Pull an image without running it
docker pull alpine

# Remove an image
docker rmi hello-world
```

---

## Lab Task

Follow these instructions to complete the lab:

1. Pull and run the `hello-world` container on your machine.
2. Confirm you see the "Hello from Docker!" message printed in your terminal.
3. Validate your progress to earn your XP:
   ```bash
   tld check
   ```

---

## Quick Recap

- `docker run <image>` — pull if needed, create container, start it
- `-it` for interactive, `-d` for detached, `-p` to map ports
- `docker ps` to see running containers, `docker images` to see local images
- Containers exit when their main process exits — that's expected