## Inspecting Storage

When containers are running with complex storage configurations, you need to verify where and how volumes are mounted. You can find this information by inspecting the container's metadata.

---

## 1. Finding Mount Information (`docker inspect`)

To find mount configurations, inspect the container and look at the `Mounts` section in the JSON output:
```bash
docker inspect <container-name>
```

You can extract the mounts directly using a Go template format:
```bash
docker inspect -f '{{json .Mounts}}' <container-name>
```

The output contains key fields for each mount:
* **`Type`**: Indicates if it is a `bind` mount or a `volume` mount.
* **`Source`**: The path on the host system where the data is stored.
* **`Destination`**: The path inside the container where the host path is mounted.

---

## Lab Tasks

### Task 1: Find volume usage
1. Start the lab in your terminal:
   ```bash
   tld start dkr-find-volume-usage
   ```
2. A background container named `analytics-app` is already running with a named volume `analytics-vol` mounted to a specific directory inside the container.
3. Use `docker inspect` to inspect `analytics-app` and locate the **Destination** path where the volume `analytics-vol` is mounted.
4. Save the exact path (e.g., `/var/log/analytics`) to the file `~/docker-test/volume_destination.txt` (create the parent directory `~/docker-test/` if it does not exist).
5. Verify the task:
   ```bash
   tld check
   ```
