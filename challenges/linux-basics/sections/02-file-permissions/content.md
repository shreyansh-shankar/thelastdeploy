## Chmod and File Permissions

Security is at the heart of Linux. Every file and folder has ownership and permissions that dictate who can read, write, or run it.

---

## 1. Understanding Permission Bits

When you run `ls -l`, you see permissions represented by 10 characters at the start of each line, for example:
`-rwxr-xr-x`

- The first character indicates the file type (e.g., `-` for a regular file, `d` for a directory).
- The next 9 characters are divided into 3 groups of 3 (each representing **Read (r)**, **Write (w)**, and **Execute (x)**):

```
 -   rwx   r-x   r-x
 │    │     │     └── Others (any user on the system)
 │    │     └──────── Group (users belonging to file's group)
 │    └────────────── Owner (the user who owns the file)
 └── File Type (- = regular file)
```

---

## 2. Octal Notation

Instead of letters, permissions are often set using numbers (0-7). Each permission type has a numerical weight:
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1
- **No permission (-)** = 0

Summing these weights gives a single digit for each user class:

- `7` = `4 + 2 + 1` (rwx: full access)
- `6` = `4 + 2` (rw-: read & write)
- `5` = `4 + 1` (r-x: read & execute)
- `4` = `4` (r--: read only)
- `0` = `0` (---: no access)

Common permission modes:
- `0755` — Owner can read/write/execute. Group/Others can read/execute (typical for scripts/executables).
- `0644` — Owner can read/write. Group/Others can read only (typical for configuration/text files).
- `0600` — Owner can read/write. No permissions for anyone else (typical for private keys, passwords, sensitive secrets).

---

## 3. Changing Permissions (`chmod`)

Use `chmod` (change mode) to update permissions:

```bash
# Set file readable/writable only by owner
chmod 600 private.txt

# Grant execute permissions to everyone
chmod +x my-script.sh

# Remove write access for others
chmod o-w shared.txt
```

---

## Lab Task

We need to secure a private secret file on our local environment. Follow these instructions:

1. Start the lab:
   ```bash
   tld start lnx-chmod-secret
   ```
2. Create a file in your home directory named `secret-file.txt`.
3. Add the single word `antigravity` into the file.
4. Modify the file's permissions using `chmod` so that **only the owner** can read and write to it (i.e. permissions must be exactly `600`).
5. Run the validator to verify your task and earn your XP:
   ```bash
   tld check
   ```
