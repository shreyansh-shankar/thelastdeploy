## Build Custom Web Server

Docker makes it extremely simple to bundle application code or static assets (like HTML, CSS, JS files) directly inside a web server image so it is fully self-contained.

---

## 1. Extending Nginx Base Image

Rather than configuring Nginx from scratch, you can use the official `nginx` image as your base and copy your custom configuration or static files into it.

The official Nginx image serves files from `/usr/share/nginx/html/` by default. 

---

## 2. Using the `COPY` Instruction

In your Dockerfile, you can use the `COPY` instruction to copy your local `index.html` file into the container's Nginx web root directory:
```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

When you build and run this container, Nginx will automatically serve your custom HTML page instead of the default Nginx welcome page.

---

## Lab Tasks

### Task 1: Build a custom Nginx site
1. Start the lab in your terminal:
   ```bash
   tld start dkr-build-custom-nginx-site
   ```
2. Navigate to the directory `~/docker-build/nginx-custom/`.
3. In this directory, you will find a file named `index.html` containing:
   ```html
   <h1>Hello from Nginx</h1>
   ```
4. Create a `Dockerfile` inside this directory:
   - Use `nginx:alpine` as the base image.
   - Copy `index.html` into `/usr/share/nginx/html/index.html` inside the image.
5. Build the Docker image and tag it as `my-nginx-web:latest`.
6. Verify the task:
   ```bash
   tld check
   ```
