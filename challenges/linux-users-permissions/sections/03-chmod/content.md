## File Permissions (chmod)

Linux uses a strict permission set to regulate read, write, and execution operations on files and directories. These permission rules are defined for three distinct user classes.

---

## 1. The Three Classes and Permission Bits

Permissions are mapped to:
- **User (u)**: The owner of the file.
- **Group (g)**: Users in the file's group.
- **Others (o)**: Everyone else on the system.

For each class, three permission bits can be turned on or off:
- **Read (r)**: View file contents or list a directory's files.
- **Write (w)**: Edit/delete a file or create/remove files inside a directory.
- **Execute (x)**: Run a script/binary or enter (`cd` into) a directory.

---

## 2. Octal Representation

Using octal (numeric) values is a very common method to define permissions. Each permission has a numeric weight:
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1
- **None (-)** = 0

Adding these weights gives a single digit (0–7) for each class:
- **7** (4+2+1) = `rwx` (Full access)
- **6** (4+2) = `rw-` (Read & Write)
- **5** (4+1) = `r-x` (Read & Execute)
- **4`** (4) = `r--` (Read Only)
- **0`** (0) = `---` (No Access)

Standard octal combinations:
- **755 (`rwxr-xr-x`)**: Commonly used for scripts, programs, and directories.
- **644 (`rw-r--r--`)**: Standard text files and configuration documents.
- **600 (`rw-------`)**: Private credentials, configuration keys, or secrets.

---

## 3. Modifying Permissions (`chmod`)

Permissions are updated using the `chmod` (change mode) command.

- **Octal Method**:
  ```bash
  chmod 755 script.sh
  ```
- **Symbolic Method**:
  ```bash
  # Grant execute permissions to user, group, and others
  chmod +x script.sh
  
  # Remove write access for group and others
  chmod go-w draft.txt
  ```

---

## Lab Tasks

### Task 1: Make a script executable
1. Start the lab in your terminal:
   ```bash
   tld start lnx-basic-chmod
   ```
2. The setup script created a file at `~/chmod-test/script.sh`.
3. Modify the permissions of this file so that it is executable by everyone (owner, group, and others) but remains writable **only** by the owner.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Secure private credentials
1. Start the lab in your terminal:
   ```bash
   tld start lnx-secure-secret-file
   ```
2. The setup script created a file at `~/chmod-test/secret.txt`.
3. Configure the file permissions so that **only** the owner has read and write access, and nobody else has any access at all.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Setup a public read-only file
1. Start the lab in your terminal:
   ```bash
   tld start lnx-public-readonly-file
   ```
2. The setup script created a file at `~/chmod-test/readme.txt`.
3. Configure the permissions so that it is readable by everyone, but writable **only** by the owner. It should not have execution privileges for anyone.
4. Verify the task:
   ```bash
   tld check
   ```
