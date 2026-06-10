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
