## Inspecting Images

Docker images contain detailed metadata about how they were built, what environment variables they define, their entrypoints, default commands, and hardware architecture. You can inspect this metadata using `docker image inspect`.

---

## 1. Inspecting Image Metadata (`docker image inspect`)

To view the raw JSON metadata of an image, run:
```bash
docker image inspect alpine:3.18.5
```
This returns a large JSON array containing configuration details.

---

## 2. Filtering Metadata using `--format`

Since the JSON output is very long, you can use Go template syntax with the `-f` or `--format` flag to extract specific fields directly.

For example, to find the image's author or architecture:
```bash
docker image inspect -f '{{.Architecture}}' alpine:3.18.5
```
Or to inspect the default command:
```bash
docker image inspect -f '{{.Config.Cmd}}' nginx:alpine
```

---

## Lab Tasks

### Task 1: Find image metadata
1. Start the lab in your terminal:
   ```bash
   tld start dkr-find-image-metadata
   ```
2. The image `alpine:3.18.5` is pre-pulled on your system.
3. Extract the **Architecture** metadata field of this image using `docker image inspect` and write it to the file `~/docker-test/image_arch.txt` (create the parent directory `~/docker-test/` if it does not exist).
4. For example, if the architecture is `amd64`, the file should contain exactly `amd64` (or `arm64`, depending on your host machine's architecture).
5. Verify the task:
   ```bash
   tld check
   ```
