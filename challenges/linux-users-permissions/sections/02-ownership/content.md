## File Ownership in Linux

In Linux, every single file and directory is owned by exactly one **User** and one **Group**. This ownership decides which permissions apply when a user tries to read, write, or execute that file.

---

## 1. Owner vs Group Ownership

When you list files using `ls -l`, the 3rd and 4th columns indicate the owner and group, respectively:

```bash
ls -l
# -rw-r--r-- 1 alice developers 1024 Jun 12 14:00 config.json
#               ▲        ▲
#             Owner    Group
```

- **Owner (User)**: Typically the user who created the file. The owner has the authority to change the file's permissions, owner, or group.
- **Group**: A group of users that share access rights to the file. Any user who belongs to the `developers` group in the example above will inherit the group's permissions for `config.json`.

To get a structured, customizable view of ownership, you can use the `stat` utility:
```bash
stat -c "%U:%G" config.json
# Outputs: alice:developers
```

---

## 2. Changing Ownership (`chown` / `chgrp`)

Only the root superuser (or users using `sudo`) can change the owner of a file to another user. Standard users cannot "give away" ownership of their files.

- **Change Owner**:
  ```bash
  sudo chown bob config.json
  ```
- **Change Owner and Group simultaneously**:
  ```bash
  sudo chown bob:admins config.json
  ```
- **Change Group Only (chgrp)**:
  ```bash
  chgrp admins config.json
  ```
  *(Standard users can use `chgrp` to change the group of a file they own, but only to a group they belong to.)*

---

## Lab Tasks

### Task 1: Identify file owner and group
1. Start the lab in your terminal:
   ```bash
   tld start lnx-check-owner
   ```
2. The setup script created a file at `/tmp/ownership-check.txt`. Find its exact owner and group names.
3. Save that information in the format `owner:group` (e.g., `alice:developers`) on a single line to a file named `owner_info.txt` inside a new directory named `ownership-test` in your home directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Change file ownership
1. Start the lab in your terminal:
   ```bash
   tld start lnx-fix-owner
   ```
2. The setup script created a file named `admin-file.txt` inside your `~/ownership-test` directory.
3. Modify the ownership of `~/ownership-test/admin-file.txt` so that both its owner and group are changed to `root`.
4. Verify the task:
   ```bash
   tld check
   ```
