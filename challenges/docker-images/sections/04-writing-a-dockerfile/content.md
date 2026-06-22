## Writing a Dockerfile

A **Dockerfile** is a text document containing all the commands a user could call on the command line to assemble a Docker image.

---

## 1. Core Dockerfile Instructions

Here are the most common instructions used when authoring a Dockerfile:

* **`FROM`**: Sets the base image for subsequent instructions. Must be the first instruction.
  ```dockerfile
  FROM alpine:3.18
  ```
* **`RUN`**: Executes commands in a new layer on top of the current image and commits the results. Used to install packages, compile code, etc.
  ```dockerfile
  RUN apk add --no-cache curl
  ```
* **`COPY`**: Copies files or directories from the host build context into the container's filesystem.
  ```dockerfile
  COPY index.html /usr/share/nginx/html/
  ```
* **`WORKDIR`**: Sets the working directory for any subsequent `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, or `ADD` instructions.
  ```dockerfile
  WORKDIR /app
  ```
* **`ENV`**: Sets environment variables that persist inside the container at runtime.
  ```dockerfile
  ENV PORT=8080
  ```
* **`CMD`**: Specifies the default command to execute when a container starts. There should only be one `CMD` in a Dockerfile.
  ```dockerfile
  CMD ["python3", "app.py"]
  ```

---

## Lab Tasks

### Task 1: Create first Dockerfile
1. Start the lab in your terminal:
   ```bash
   tld start dkr-create-first-dockerfile
   ```
2. Navigate to the directory `~/docker-build/first-dockerfile/`.
3. Create a `Dockerfile` with the following requirements:
   - Use `alpine:3.18` as the base image.
   - Set an environment variable `APP_COLOR` to `blue` using `ENV`.
   - Set the default command to print `Hello DevLab` using `CMD` (use JSON array syntax: `CMD ["echo", "Hello DevLab"]` or shell format).
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Fix broken Dockerfile
1. Start the lab in your terminal:
   ```bash
   tld start dkr-fix-broken-dockerfile
   ```
2. In the directory `~/docker-build/broken-dockerfile/`, you will find a `Dockerfile` that fails to build due to a syntax error.
3. Fix the syntax error in the Dockerfile so that it successfully builds.
4. Verify the task:
   ```bash
   tld check
   ```
