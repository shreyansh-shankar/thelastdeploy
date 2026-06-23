## Backup and Restore

Since Docker volume contents are stored in root-owned directories managed by the Docker daemon (e.g., `/var/lib/docker/volumes/`), backing them up directly from the host filesystem can be difficult. The standard pattern is to use a temporary container to archive the volume content to a host-mapped directory.

---

## 1. How the Volume Backup Pattern Works

To back up a volume, you start a temporary container that links both the volume and your host machine:

1. **Volume Mount**: Mounts the volume you want to back up to a temporary folder inside the container (e.g., `/volume`).
2. **Bind Mount**: Mounts a host directory to a temporary folder inside the container (e.g., `/backup`) where the backup file will be saved.
3. **Archive Command**: Runs `tar` inside the container to compress the contents of `/volume` and save the resulting `.tar` file into `/backup/`.

---

## 2. Command Template for Backing Up

Here is the general template to perform a backup:

```bash
docker run --rm \
  -v <volume-name>:/volume \
  -v <host-backup-directory>:/backup \
  alpine tar cvf /backup/<backup-file-name>.tar -C /volume .
```

### Breakdown of the template:
* **`--rm`**: Automatically deletes the temporary container once the backup command finishes.
* **`-v <volume-name>:/volume`**: Mounts the Docker volume you want to copy files from to `/volume` inside the container.
* **`-v <host-backup-directory>:/backup`**: Maps the directory on your host machine where you want the backup file saved to `/backup` inside the container.
* **`alpine`**: The lightweight temporary image used to run the backup tools.
* **`tar cvf /backup/<backup-file-name>.tar -C /volume .`**: Compresses all files in the volume (`-C /volume .`) and saves the archive to the backup path on your host machine.

---

## Lab Tasks

### Task 1: Backup volume
1. Start the lab in your terminal:
   ```bash
   tld start dkr-backup-volume
   ```
2. A named volume `prod-db-vol` exists and contains critical database files.
3. Your goal is to back up all contents of `prod-db-vol` into a tar archive file named `backup.tar` inside the host directory `~/docker-backup/` (which is already created for you).
4. Run a temporary container using the template above by making the following substitutions:
   - Replace `<volume-name>` with `prod-db-vol`.
   - Replace `<host-backup-directory>` with `~/docker-backup` (or the absolute path `$HOME/docker-backup`).
   - Replace `<backup-file-name>` with `backup`.
5. Verify the task:
   ```bash
   tld check
   ```
