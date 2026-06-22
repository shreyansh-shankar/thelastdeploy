## Your First Container

Now that we understand the difference between images (blueprints) and containers (instances), let's instantiate one ourselves.

---

## 1. Running a Container (`docker run`)

The most fundamental Docker command is `docker run`. Under the hood, this command:
1. Checks if the requested image is available locally.
2. If not, pulls (downloads) it automatically from Docker Hub.
3. Creates a new writeable container layer.
4. Starts the container and executes its default command.

```bash
docker run hello-world
```

---

## 2. Interactive Containers (`-it` flags)

By default, containers run in the background or print their output and exit. If you want to interactively explore inside a container (like launching a shell inside a mini-OS), you need two flags:
* `-i` (interactive): Keep STDIN open so you can type commands.
* `-t` (tty): Allocate a pseudo-TTY (a terminal interface).

To run an interactive Ubuntu shell, run:
```bash
docker run -it ubuntu bash
```
Once inside, you are in an isolated Ubuntu container file system! Type `exit` to stop the container and return to your host shell.

---

## Lab Tasks

### Task 1: Run alpine container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-run-alpine-container
   ```
2. Your goal is to run a container using the `alpine` image named `my-alpine-run` that prints the message `Hello from Alpine` to stdout and then exits.
   *Hint: You can pass arguments to the container command, e.g. `docker run --name my-alpine-run alpine echo "Hello from Alpine"`.*
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Run hello-world container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-run-hello
   ```
2. Run the official `hello-world` container. This will verify that your Docker installation is fully working and the engine can pull images from Docker Hub.
3. Verify the task:
   ```bash
   tld check
   ```
