## Running a Web Server

Running background applications, like databases or web servers, is one of Docker's most common use cases. To do this, we need to understand how to keep containers running in the background and expose their ports to our local machine.

---

## 1. Detached Mode (`-d`)

By default, `docker run` runs in the foreground, locking up your terminal shell and printing output to your screen. 
To run a container in the background (detached), use the `-d` flag:
```bash
docker run -d nginx
```
Docker will start the container and print its long CONTAINER ID, immediately returning control back to your terminal prompt.

---

## 2. Port Mapping (`-p`)

A container runs in its own isolated network namespace. By default, processes running inside it (like a web server on port 80) cannot be accessed from outside the container.

To expose ports, we map a port on our host machine to a port inside the container:
```bash
docker run -d -p 8080:80 nginx
```
Here, `-p 8080:80` means: **route any traffic hitting port 8080 of my host machine to port 80 inside the container.** You can now visit `http://localhost:8080` in your web browser.

---

## Lab Tasks

### Task 1: Access web container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-access-web-container
   ```
2. A background web server container named `secret-web` has been started and mapped to host port `8082`.
3. Query the homepage of this web server using the `curl` command. Capture the HTTP response code of the request and save it to a file named `web_status.txt` inside your `~/docker-test/` directory.
   *Hint: You can use `curl -s -o /dev/null -w "%{http_code}" http://localhost:8082` to output just the status code (e.g. `200`).*
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Run an Nginx container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-run-nginx
   ```
2. Your goal is to start a background (detached) container named `my-nginx-server` using the official `nginx` (or `nginx:alpine`) image.
3. Map port `8085` on your host machine to port `80` inside the container.
4. Verify the task:
   ```bash
   tld check
   ```
