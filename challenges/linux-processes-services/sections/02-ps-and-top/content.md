## Process Monitoring (ps and top)

To manage a system effectively, you must be able to inspect currently active processes, measure their resource footprint (CPU/Memory), and identify which ones are consuming excessive resources.

---

## 1. Snapshot Monitoring (`ps`)

The `ps` (process status) command provides a static snapshot of active processes.
- **ps aux**: The most common BSD-style syntax.
  - `a`: Shows processes for all users.
  - `u`: Displays user-oriented format (owner, CPU%, Mem%, start time).
  - `x`: Lists processes that are not attached to a terminal (e.g. background services).
- **ps -ef**: Standard System V syntax.
  - `-e`: Selects all processes.
  - `-f`: Generates full-format listing (including PPID).

To check processes for a specific user:
```bash
ps -u username
```

---

## 2. Real-Time Monitoring (`top` / `htop`)

- **top**: Displays a dynamic, real-time list of running processes, sorted by CPU usage by default.
  - Press `M` to sort by Memory usage.
  - Press `P` to sort by CPU usage.
  - Press `q` to exit.
- **htop**: An interactive, colorful process viewer (if installed) that supports scrolling and direct process killing.

---

## 3. Querying PIDs (`pgrep`)

If you want to find the PID of a specific process without parsing `ps` outputs manually, use `pgrep`:
```bash
pgrep nginx
# Outputs: 1420
```

---

## Lab Tasks

### Task 1: Record your running processes
1. Start the lab in your terminal:
   ```bash
   tld start lnx-list-running-processes
   ```
2. Query the system for all running processes that belong to your active user account.
3. Save that process list output directly to a file named `my_processes.txt` inside a new directory named `process-test` in your home directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Identify a resource-intensive process
1. Start the lab in your terminal:
   ```bash
   tld start lnx-find-memory-hog
   ```
2. The setup script launched a background process named `mem_hog_process`.
3. Locate this process on the system and find its numeric **Process ID (PID)**.
4. Save the PID number (e.g., `4520`) on a single line to a file named `memory_hog.txt` inside your `~/process-test` directory.
5. Verify the task:
   ```bash
   tld check
   ```
