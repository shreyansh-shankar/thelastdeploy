## Data Missing

When running databases inside containers, persistence is crucial. A common mistake is misconfiguring volume paths inside the `docker-compose.yml` or container launch commands.

---

### Mismatched Volume Paths

In Postgres, data is stored by default at `/var/lib/postgresql/data`. If you create a bind mount mapping a local folder to a different path inside the container (e.g. `/var/lib/postgresql`), Postgres will not find the configuration or existing records and will bootstrap a brand new empty database directory in the container's scratch space.

If you bring down the container with `docker compose down` and restart it, any data created during the session will disappear.

---

## Lab Tasks

### Task 1: Recover persistent data
1. Start the task:
   ```bash
   tld start dkr-recover-persistent-data
   ```
2. Navigate to `~/docker-troubleshooting/persistence/`.
3. In this folder, a seed directory `./postgres_data/` has been prepared on the host and contains persistent database marker files.
4. Open the `docker-compose.yml` file. It has a volume mapping typo that mounts `./postgres_data` inside the container at `/var/lib/postgresql` instead of `/var/lib/postgresql/data`.
5. Edit the `docker-compose.yml` file to correct this mapping.
6. Run `docker compose up -d` to reload the service.
7. Verify the task:
   ```bash
   tld check
   ```
