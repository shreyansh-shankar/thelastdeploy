## Environment Variables

An **environment variable** is a dynamic-named value that can affect the way running processes will behave on a computer. They are part of the environment in which a process runs.

---

## 1. Local Shell Variables vs Global Environment Variables

- **Local Shell Variables**: Variables that are accessible only in the current shell session where they were defined. Child processes (like scripts or programs run from this shell) cannot access them.
  ```bash
  MY_VAR="hello"
  ```
- **Environment Variables**: Globally exported variables that are inherited by any child processes or subshells started from the current shell.
  ```bash
  export MY_VAR="hello"
  ```

---

## 2. Listing and Querying Variables

- **printenv** / **env**: Displays all exported environment variables.
- **echo $VARIABLE_NAME**: Displays the value of a specific variable (works for both local shell and environment variables).

---

## 3. Persistent Variables

When you define variables in a terminal, they disappear as soon as you close that terminal session. To make them persistent (available every time you open a new shell), you must define them inside shell configuration startup files:
- **~/.bashrc**: The configuration file for interactive non-login shells (typical terminal windows).
- **~/.profile** / **~/.bash_profile**: Executed for login shells.

To make an environment variable persistent, append its export statement to `~/.bashrc`:
```bash
echo 'export APP_PORT=8080' >> ~/.bashrc
```

---

## Lab Tasks

### Task 1: Declare a local shell variable
1. Start the lab in your terminal:
   ```bash
   tld start lnx-create-env-var
   ```
2. Save the syntax used to declare a local shell variable named `MY_LOCAL_VAR` with the value `devlab_local` to a file named `local_var.txt` inside a new directory named `env-test` in your home directory.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Export an environment variable
1. Start the lab in your terminal:
   ```bash
   tld start lnx-export-variable
   ```
2. Save the complete command used to export an environment variable named `DEVLAB_MODE` with the value `production` to a file named `export_cmd.txt` inside your `~/env-test` directory.
3. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Make an environment variable persistent
1. Start the lab in your terminal:
   ```bash
   tld start lnx-persistent-env-var
   ```
2. Append a persistent configuration to your user's `~/.bashrc` file that exports an environment variable named `PLATFORM_NAME` with the value `DevLabPlatform` for all future shell sessions.
3. Verify the task:
   ```bash
   tld check
   ```
