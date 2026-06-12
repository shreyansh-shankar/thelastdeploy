## Background Jobs

When you run a command in a terminal, it ordinarily locks up your shell prompt until it completes. This is **foreground execution**. For long-running commands, you can run them in the **background** to keep your terminal free.

---

## 1. Starting a Process in the Background (`&`)

To start a command in the background directly, append an ampersand (`&`) to the end of the command:
```bash
sleep 300 &
# Outputs: [1] 5420
```
- `[1]`: The Job ID (a shell-specific number).
- `5420`: The system Process ID (PID).

---

## 2. Managing Job States

If a command is running in the foreground and you want to push it to the background:
1. **Suspend it**: Press **`Ctrl+Z`**. This stops the execution of the command and places it in the shell's jobs queue as "Stopped".
2. **Move to background**: Run the `bg` command to resume its execution in the background:
   ```bash
   bg %1
   ```
   *(Or just `bg` to resume the most recently suspended job).*

To bring a background job back to the foreground:
```bash
fg %1
```

---

## 3. Listing Active Shell Jobs (`jobs`)

To see the list of active jobs managed by your current shell:
```bash
jobs
# Outputs:
# [1]+  Running                 sleep 300 &
# [2]-  Stopped                 nano draft.txt
```

---

## Lab Tasks

### Task 1: Start a job in the background
1. Start the lab in your terminal:
   ```bash
   tld start lnx-run-background-job
   ```
2. Start a `sleep` process running for exactly `999` seconds in the background.
3. Find the Process ID (PID) of this new background sleep process.
4. Save the PID number on a single line to a file named `bg_pid.txt` inside a new directory named `jobs-test` in your home directory.
5. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Resume a suspended process
1. Start the lab in your terminal:
   ```bash
   tld start lnx-resume-suspended-job
   ```
2. The setup script created a process named `suspended_job` and suspended it (SIGSTOP state).
3. Find this process on your system and resume its execution in the background (state change to running).
4. Verify the task:
   ```bash
   tld check
   ```
