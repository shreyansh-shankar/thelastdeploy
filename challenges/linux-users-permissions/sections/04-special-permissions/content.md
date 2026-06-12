## Special Permissions (SUID, SGID, Sticky Bit)

Standard user/group/others permission permissions cover most scenarios, but Linux has three special permission bits for advanced access patterns: **SUID**, **SGID**, and the **Sticky Bit**.

---

## 1. SUID (Set User ID)

When the **SUID** bit is set on an executable file, any user running it will temporarily execute the process with the privileges of the **file's owner** rather than their own.
- **Classic Example**: The `passwd` command has the SUID bit set and is owned by `root`. This allows regular users to update their passwords, which requires writing to the root-only file `/etc/shadow`.
- **Representation**: Indicated by an `s` in the owner's execute field (e.g., `-rwsr-xr-x`). In octal, SUID adds a leading **4** (e.g., `4755`).
- **Configuration**:
  ```bash
  chmod u+s executable_file
  # or
  chmod 4755 executable_file
  ```

---

## 2. SGID (Set Group ID)

The **SGID** bit has two behaviors:
1. **On Executable Files**: The process executes with the privileges of the file's **group** owner.
2. **On Directories**: Any new files/subdirectories created inside this directory automatically inherit the **group ownership** of the parent directory, rather than the primary group of the user who created them. This is vital for shared project workspaces.
- **Representation**: Indicated by an `s` in the group's execute field (e.g., `-rwxr-s-xr-x`). In octal, SGID adds a leading **2** (e.g., `2755`).
- **Configuration**:
  ```bash
  chmod g+s directory_name
  # or
  chmod 2755 directory_name
  ```

---

## 3. The Sticky Bit

Historically used to keep executables in memory, the **Sticky Bit** is now used exclusively on directories to prevent users from deleting or renaming files owned by other users inside that directory, even if they have write permissions on the directory itself.
- **Classic Example**: The `/tmp` directory has the Sticky Bit set so users cannot delete each other's temporary files.
- **Representation**: Indicated by a `t` in the others' execute field (e.g., `drwxrwxrwt`). In octal, the Sticky Bit adds a leading **1** (e.g., `1777`).
- **Configuration**:
  ```bash
  chmod +t shared_directory
  # or
  chmod 1777 shared_directory
  ```

---

## Lab Tasks

### Task 1: Configure SUID on a helper utility
1. Start the lab in your terminal:
   ```bash
   tld start lnx-setuid-lab
   ```
2. The setup script created an executable helper at `~/special-test/suid-helper`.
3. Set the SUID permission bit on `~/special-test/suid-helper` while keeping its existing standard permissions (`755`).
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Protect a directory with the Sticky Bit
1. Start the lab in your terminal:
   ```bash
   tld start lnx-sticky-bit-lab
   ```
2. The setup script created a directory at `~/special-test/sticky-dir`.
3. Configure the Sticky Bit on the directory `~/special-test/sticky-dir` while ensuring it is writable and readable by everyone (`777` permissions).
4. Verify the task:
   ```bash
   tld check
   ```
