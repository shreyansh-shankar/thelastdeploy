## Run Your First Container

Time to put theory into practice. In this section you'll run your first Docker container and understand exactly what happens when you do.

---

## The hello-world Container

Docker maintains an official `hello-world` image specifically for testing installations. It's the simplest possible container — it runs, prints a message, and exits.

```bash
docker run hello-world
```

When you run this, Docker does the following:

1. **Checks local cache** — does the `hello-world` image exist locally?
2. **Pulls from Docker Hub** — if not, downloads it automatically
3. **Creates a container** — instantiates the image
4. **Runs the container** — executes the default command
5. **Exits** — the container stops after the command completes

---

## What the Output Means

You should see something like:

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...

Hello from Docker!
This message shows that your installation appears to be working correctly.

The first two lines only appear on the first run — Docker is downloading the image. On subsequent runs it uses the cached version.

---

## Useful docker run Flags

Now that you've run hello-world, here are flags you'll use constantly:

```bash
# Run in detached mode (background)
docker run -d nginx

# Run with a name
docker run --name my-nginx nginx

# Map a port (host:container)
docker run -p 8080:80 nginx

# Run interactively with a terminal
docker run -it ubuntu bash

# Automatically remove container when it exits
docker run --rm hello-world

# Set an environment variable
docker run -e MY_VAR=hello nginx
```

---

## Inspecting Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View logs from a container
docker logs <container-id>

# Inspect container details
docker inspect <container-id>
```

---

## Your Task

Run the `hello-world` container:

```bash
docker run hello-world
```

Then run `orbstack check` to validate and earn your XP.

> 💡 Make sure Docker is running before attempting this. On Linux, verify with `docker info`.