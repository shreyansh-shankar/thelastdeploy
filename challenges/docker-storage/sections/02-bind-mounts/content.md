## Bind Mounts

A **bind mount** maps a specific file or directory on your host machine to a path inside a container. Since the files reside on the host filesystem, any changes made on the host are immediately visible inside the container, and vice versa.

---

## 1. Syntax for Bind Mounts

You can configure a bind mount using either the `-v` (or `--volume`) flag or the newer, more explicit `--mount` flag.

### Using `-v` (Shortcut Syntax)
```bash
docker run -d -v /path/on/host:/path/in/container nginx
```

### Using `--mount` (Explicit Syntax)
```bash
docker run -d --mount type=bind,source=/path/on/host,target=/path/in/container nginx
```
* **`type=bind`**: Specifies that this is a bind mount (rather than a named volume).
* **`source` / `src`**: The absolute path to the directory or file on the host machine.
* **`target` / `dst`**: The path inside the container where the files will be mounted.

---

## Lab Tasks

### Task 1: Edit a mounted file
1. Start the lab in your terminal:
   ```bash
   tld start dkr-edit-mounted-file
   ```
2. A background container named `notes-viewer` is already running with the host directory `~/docker-mount-test/` mapped to `/notes/` inside the container.
3. Edit the file `~/docker-mount-test/notes.txt` on your host machine.
4. Replace its content with exactly:
   ```text
   DevLab Rocks
   ```
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Share host directory
1. Start the lab in your terminal:
   ```bash
   tld start dkr-share-host-directory
   ```
2. Start a background Nginx container named `nginx-mount` using the `nginx:alpine` image.
3. Bind mount the host directory `~/docker-share/` (which is pre-created and contains an `index.html`) to the Nginx web root `/usr/share/nginx/html` inside the container.
4. Expose the server by mapping host port `8085` to container port `80`.
5. Verify the task:
   ```bash
   tld check
   ```
