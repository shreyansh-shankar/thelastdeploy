## Custom Images and Dockerfiles

So far, we have only run pre-built container images from Docker Hub. In this section, you'll learn how to write a `Dockerfile` to package your own applications as container images.

---

## 1. What is a Dockerfile?

A `Dockerfile` is a text document containing all the commands/instructions a user could call on the command line to assemble an image.

Here are the most common instructions:

- `FROM` — Specifies the base image to start from (e.g., `FROM nginx:alpine`).
- `COPY` — Copies files/directories from the host machine into the container's filesystem.
- `WORKDIR` — Sets the working directory for subsequent instructions inside the container.
- `EXPOSE` — Documents which port the container listens on at runtime.
- `CMD` — Specifies the command that executes by default when starting a container from this image.

---

## 2. A Simple Example

Suppose we want to host a static HTML website using Nginx.

**`index.html`**
```html
<!DOCTYPE html>
<html>
<body>
  <h1>Welcome to TLD Custom Server!</h1>
</body>
</html>
```

**`Dockerfile`**
```dockerfile
# Start from the official nginx light-weight image
FROM nginx:alpine

# Copy our custom index.html to the default Nginx web root directory
COPY index.html /usr/share/nginx/html/

# Document that the container runs on port 80
EXPOSE 80
```

---

## 3. Building and Running Your Image

To build an image, run `docker build` from the directory containing your `Dockerfile`:

```bash
# Build the image and tag it (-t) as 'my-web-app:latest'
# The dot (.) at the end specifies the build context (current directory)
docker build -t my-web-app:latest .
```

To run a container using your newly built image:

```bash
# Run container in background (-d), map host port 8256 to container port 80 (-p)
# Name the container 'tld-my-web-app'
docker run --name tld-my-web-app -p 8256:80 -d my-web-app:latest
```

Open your web browser and go to `http://localhost:8256` to see your custom index page!

---

## Lab Task

Create and run a custom Nginx-based container:

1. Start the lab:
   ```bash
   tld start dkr-build-web
   ```
2. Create a clean project directory of your choice and move into it.
3. Create a file named `index.html` containing the word `antigravity` (or any web content).
4. Create a `Dockerfile` that uses `nginx:alpine` as the base image, copies your `index.html` into `/usr/share/nginx/html/`, and exposes port `80`.
5. Build the image and tag it exactly as `my-web-app:latest`.
6. Start a container from this image named `tld-my-web-app` running in the background and mapping host port `8256` to container port `80`.
7. Verify by running:
   ```bash
   tld check
   ```
