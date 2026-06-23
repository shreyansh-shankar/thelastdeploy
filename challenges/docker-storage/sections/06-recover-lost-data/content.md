## Recover Lost Data

Restoring data back into a Docker volume follows a similar pattern to backing it up. You start a temporary container that mounts the target volume and binds the host directory containing the backup archive, then extract the archive back into the volume.

---

## 1. The Volume Restore Pattern

To restore data from a host-side `backup.tar` into a volume:
1. Ensure the target volume exists (or create it using `docker volume create new-volume`).
2. Run a temporary container that mounts the empty volume and maps the backup directory.
3. Extract the tar archive into the volume's mount point inside the container.

```bash
docker run --rm \
  -v new-volume:/volume \
  -v $(pwd):/backup \
  alpine sh -c "tar xvf /backup/backup.tar -C /volume"
```

* **`-v new-volume:/volume`**: Mounts the destination volume `/volume` inside the container.
* **`-v $(pwd):/backup`**: Maps the host directory containing the backup file to `/backup` inside the container.
* **`tar xvf /backup/backup.tar -C /volume`**: Unpacks the archive into the volume directory. If the archive was created with paths relative to the volume root, it will restore the files exactly where they belong.

---

## Lab Tasks

### Task 1: Restore application data
1. Start the lab in your terminal:
   ```bash
   tld start dkr-restore-application-data
   ```
2. An empty volume named `restored-db-vol` is already created for you.
3. A backup archive `backup.tar` is present in the host directory `~/docker-restore-source/`.
4. Your goal is to restore the files inside `~/docker-restore-source/backup.tar` into the named volume `restored-db-vol`.
5. The restored volume should contain the file `db_state.json` at its root.
6. Verify the task:
   ```bash
   tld check
   ```
