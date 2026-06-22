## Finding and Pulling Images

To run a container, you first need a Docker image. If the image is not already present locally on your host machine, Docker will search for it on a registry (by default, Docker Hub) and download it.

---

## 1. Searching for Images

You can search for official and community-contributed images on Docker Hub via the web interface or directly in your terminal:
```bash
docker search nginx
```
The output shows the image names, descriptions, star ratings, and whether they are **official** images maintained by the software vendors.

---

## 2. Pulling Images and Using Tags (`docker pull`)

To download an image without running a container, use `docker pull`:
```bash
docker pull <image-name>:<tag>
```

### Understanding Tags and Versioning
* **Tags**: Tags are aliases pointing to specific image builds (e.g. `latest`, `alpine`, `1.21.6`).
* **The default `latest` Tag**: If you do not specify a tag (e.g., `docker pull nginx`), Docker defaults to the `latest` tag. Note that `latest` is not magically updated; it is simply a tag conventions use to point to the newest stable build.
* **Pinning Versions**: For production stability, you should always pin to specific versions (like `nginx:1.21.6` or `nginx:1.21.6-alpine`) so your environments remain reproducible.

---

## Lab Tasks

### Task 1: Pull Nginx image
1. Start the lab in your terminal:
   ```bash
   tld start dkr-pull-nginx
   ```
2. Download the default (latest) `nginx` image from Docker Hub.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Pull specific version
1. Start the lab in your terminal:
   ```bash
   tld start dkr-pull-specific-version
   ```
2. Pull Nginx version `1.21.6` from Docker Hub.
3. Verify the task:
   ```bash
   tld check
   ```
