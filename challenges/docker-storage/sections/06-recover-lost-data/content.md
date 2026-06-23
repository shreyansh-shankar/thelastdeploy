## Recover Lost Data

Restoring data back into a Docker volume follows a similar pattern to backing it up. You start a temporary container that mounts the target volume and binds the host directory containing the backup archive, then extract the archive back into the volume.

---

## 1. How the Volume Restore Pattern Works

To restore files from a backup file (like `backup.tar`) on your host machine back into a volume:

1. **Volume Mount**: Mounts the destination volume (where you want the files to go) to a folder inside the container (e.g., `/volume`).
2. **Bind Mount**: Mounts the host directory containing your backup file to a folder inside the container (e.g., `/backup`).
3. **Extract Command**: Runs `tar` inside the container to extract the archive file from `/backup/` directly into `/volume`.

---

## 2. Command Template for Restoring

Here is the general template to perform a restore:

```bash
docker run --rm \
  -v <volume-name>:/volume \
  -v <host-backup-directory>:/backup \
  alpine tar xvf /backup/<backup-file-name>.tar -C /volume
```

### Breakdown of the template:
* **`--rm`**: Automatically deletes the temporary container once the extraction finishes.
* **`-v <volume-name>:/volume`**: Mounts the empty destination volume to `/volume` inside the container.
* **`-v <host-backup-directory>:/backup`**: Maps the host directory where your `backup.tar` is stored to `/backup` inside the container.
* **`alpine`**: The temporary container image used to run the restore tool.
* **`tar xvf /backup/<backup-file-name>.tar -C /volume`**: Extracts the contents of the tarball directly into the mounted volume (`-C /volume`).

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
5. Run a temporary container using the template above by making the following substitutions:
   - Replace `<volume-name>` with `restored-db-vol`.
   - Replace `<host-backup-directory>` with `~/docker-restore-source` (or the absolute path `$HOME/docker-restore-source`).
   - Replace `<backup-file-name>` with `backup`.
6. Verify the task:
   ```bash
   tld check
   ```
