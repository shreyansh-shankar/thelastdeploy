## File Searching

Searching for files and locating strings inside them are essential DevOps and administration workflows. Linux provides two major tools for these tasks: `find` and `grep`.

---

## 1. Locating Files (`find`)

The `find` command searches for files and directories in a directory hierarchy based on criteria like filename, type, size, or modification date.

- **Search by name**:
  ```bash
  # Find files named app.conf in the current directory and subdirectories
  find . -name "app.conf"
  ```
- **Search by type**:
  ```bash
  # Find all directories in the current folder
  find . -type d
  ```
- **Search by extension**:
  ```bash
  # Find all config files matching the glob pattern *.conf
  find /etc -name "*.conf"
  ```

---

## 2. Searching Text Inside Files (`grep`)

The `grep` command searches files for lines containing a specific pattern (regular expression or literal string) and prints the matching lines.

- **Basic search**:
  ```bash
  grep "secret-key" application.yaml
  ```
- **Case-insensitive search (`-i`)**:
  ```bash
  grep -i "error" system.log
  ```
- **Recursive directory search (`-r`)**:
  ```bash
  # Search all files under the directory configs/ for database settings
  grep -r "database" configs/
  ```
- **Line number lookup (`-n`)**:
  ```bash
  grep -n "FAIL" build.log
  ```

---

## Lab Tasks

### Task 1: Locate configuration files using find
1. Start the lab in your terminal:
   ```bash
   tld start lnx-find-config
   ```
2. Find the file named `app.conf` under `~/search-test/` using the `find` utility.
3. Save its absolute path to a file named `found_conf.txt` directly inside the `~/search-test/` directory.
4. Verify the task to earn your XP:
   ```bash
   tld check
   ```

### Task 2: Search secret line using grep
1. Start the lab in your terminal:
   ```bash
   tld start lnx-grep-secret
   ```
2. Search for the line containing `devlab-key` in configuration files inside `~/search-test/configs/` using `grep`.
3. Save the matching line to a file named `secret_line.txt` inside `~/search-test/`.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Combined find and grep operations
1. Start the lab in your terminal:
   ```bash
   tld start lnx-combined-search
   ```
2. Look up which log file under `~/search-test/logs/` contains the critical error keyword `FATAL`.
3. Save the path of that file (which should end in `error-log-1.txt`) to a file named `fatal_log.txt` inside `~/search-test/`.
4. Verify the task:
   ```bash
   tld check
   ```
