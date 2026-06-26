## Container Incident Response

When a critical production app crashes repeatedly (known as a crash loop), you must act fast.

---

### Step-by-step Incident Triage

1. **Check if the container is running**:
   ```bash
   docker ps -a
   ```
2. **Review the latest log entries**:
   ```bash
   docker logs --tail 50 <container_name>
   ```
3. **Inspect the exit code**:
   An exit code of `1` indicates an application exception. Look for missing config files, invalid database credentials, or syntax bugs in scripts.
4. **Fix config/resource mismatches**:
   Most crash loops in Docker Compose are caused by missing files on the host that are expected to be mounted, or incorrect environment variables.

---

## Lab Tasks

### Task 1: Investigate a production incident
1. Start the task:
   ```bash
   tld start dkr-investigate-production-incident
   ```
2. Navigate to `~/docker-troubleshooting/incident/`.
3. Try to run the compose stack (`docker compose up -d`). Notice that the `app` container fails immediately and enters a stopped state.
4. Check the logs:
   ```bash
   docker compose logs app
   ```
5. You will see a crash message:
   `FATAL: config.json not found at /etc/app/config.json`
6. To resolve this:
   - Create a file on the host at `~/docker-troubleshooting/incident/config.json`.
   - In this file, write:
     ```json
     {"status": "ok"}
     ```
   - Edit the `docker-compose.yml` file to mount `./config.json` inside the `app` container at `/etc/app/config.json`.
7. Re-launch the stack:
   ```bash
   docker compose up -d
   ```
8. Verify the fix:
   ```bash
   tld check
   ```
