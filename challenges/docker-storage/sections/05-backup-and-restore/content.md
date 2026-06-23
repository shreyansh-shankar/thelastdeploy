## Backup and Restore

Since Docker volume contents are stored in root-owned directories managed by the Docker daemon (e.g. `/var/lib/docker/volumes/`), backing them up directly from the host filesystem can be difficult. The standard pattern is to use a temporary container to archive the volume content to a host-mapped directory.

---

## 1. The Volume Backup Pattern

To back up a volume, you start a temporary container that mounts:
1. The **volume** you want to back up.
2. A **bind mount** pointing to a directory on your host machine where you want to save the backup file.

Then, run `tar` inside the container to archive the volume files into a tarball inside the bind mount directory:
```bash
docker run --rm \
  -v my-volume:/volume \
  -v $(pwd):/backup \
  alpine tar cvf /backup/backup.tar -C /volume .
```

* **`--rm`**: Automatically removes the temporary container when it exits.
* **`-v my-volume:/volume`**: Mounts the target volume to `/volume` inside the container.
* **`-v $(pwd):/backup`**: Maps your current directory on the host to `/backup` inside the container.
* **`alpine tar cvf /backup/backup.tar -C /volume .`**: Runs `tar` inside an alpine container to compress the files from `/volume` and write the archive to `/backup/backup.tar`.

---

## Lab Tasks

### Task 1: Backup volume
1. Start the lab in your terminal:
   ```bash
   tld start dkr-backup-volume
   ```
2. A named volume `prod-db-vol` exists and contains critical database files.
3. Your goal is to back up the contents of `prod-db-vol` into a tar archive file named `backup.tar` inside the host directory `~/docker-backup/` (which is already created for you).
4. Run a temporary container (using `alpine` image) to map `prod-db-vol` and bind mount `~/docker-backup/`, then run `tar` to archive all contents of the volume to `/backup/backup.tar` (or similar location).
5. Verify the task:
   ```bash
   tld check
   ```
