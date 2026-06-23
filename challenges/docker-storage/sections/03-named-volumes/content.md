## Named Volumes

Unlike bind mounts, which expose the host directory structure directly to the container, **Named Volumes** are completely managed by Docker. They are stored in a dedicated, isolated directory on the host machine (`/var/lib/docker/volumes/` on Linux) and are the recommended way to persist data in Docker.

---

## 1. Managing Named Volumes

You can manage the lifecycle of volumes using `docker volume` commands:

* **Create a volume**:
  ```bash
  docker volume create my-volume
  ```
* **List all volumes**:
  ```bash
  docker volume ls
  ```
* **Remove a volume**:
  ```bash
  docker volume rm my-volume
  ```

---

## 2. Mounting Named Volumes inside a Container

To mount a volume, pass the volume name as the first argument in the `-v` flag:
```bash
docker run -d --name web -v my-volume:/usr/share/nginx/html nginx:alpine
```
If the volume `my-volume` does not exist when starting the container, Docker automatically creates it for you.

---

## Lab Tasks

### Task 1: Create volume
1. Start the lab in your terminal:
   ```bash
   tld start dkr-create-volume
   ```
2. Create a named volume named `app-data-vol` using the Docker volume management CLI.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Persist application data
1. Start the lab in your terminal:
   ```bash
   tld start dkr-persist-application-data
   ```
2. Start a background Nginx container named `db-container` using the `nginx:alpine` image. Mount the pre-created named volume `db-storage-vol` to `/usr/share/nginx/html` inside the container.
3. Write a file named `index.html` inside the mounted directory `/usr/share/nginx/html/` of the container. The content of the file must be exactly:
   ```text
   Database persistent content
   ```
4. Stop and remove the `db-container` container.
5. Create a **new** Nginx container named `db-container-new` using the `nginx:alpine` image, and mount the **same** volume `db-storage-vol` to `/usr/share/nginx/html`.
6. Verify the task:
   ```bash
   tld check
   ```
