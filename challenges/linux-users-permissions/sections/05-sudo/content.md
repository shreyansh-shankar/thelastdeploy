## Sudo and Privilege Escalation

Because the administrative superuser (`root`) has absolute control over the operating system, logging in directly as root is discouraged for safety. Instead, Linux users use **privilege escalation** tools to execute administrative commands selectively.

---

## 1. Running commands with `sudo`

The `sudo` (Superuser Do) utility allows permitted users to execute a command as the superuser (or another user), as defined by the security policy.
- **Usage**:
  ```bash
  sudo apt-get update
  ```
- **Caching**: When you run a command using `sudo`, the system caches your credentials for a short grace period (usually 15 minutes). You won't need to retype your password for subsequent `sudo` commands during this time.

---

## 2. The Sudoers File (`/etc/sudoers`)

The security policy for `sudo` is configured in `/etc/sudoers`. This file is extremely sensitive; syntactic errors can completely lock users out of `sudo` capabilities.
- **visudo**: To prevent misconfigurations, always edit this file (or files inside `/etc/sudoers.d/`) using the `visudo` command, which validates syntax before saving the file.

### Sudoers Rule Syntax
A standard sudo rule follows this pattern:
```
username host_list=(runas_user:runas_group) commands_list
```
- **Example 1**: Grant user `alice` permission to run all commands as any user/group:
  ```
  alice ALL=(ALL:ALL) ALL
  ```
- **Example 2**: Allow members of the group `admin` to run all commands without prompting for a password:
  ```
  %admin ALL=(ALL) NOPASSWD: ALL
  ```
  *(The `%` symbol indicates a group name rather than a user.)*

---

## Lab Tasks

### Task 1: View protected credentials using sudo
1. Start the lab in your terminal:
   ```bash
   tld start lnx-run-sudo-command
   ```
2. The file `/etc/shadow` contains encrypted password hashes and is readable only by the root user.
3. Use `sudo` to view the contents of `/etc/shadow` and write its **very first line** (which typically contains the root user entry) to a file named `admin_only.txt` inside a new directory named `sudo-test` in your home directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Configure passwordless sudo for a deployer script
1. Start the lab in your terminal:
   ```bash
   tld start lnx-fix-sudo-access
   ```
2. The setup script created a configuration template at `~/sudo-test/deployer-sudo`.
3. Edit this file so it contains a single, valid sudoers rule that grants the user `deployer` permission to run **all** commands as any user and group, without ever prompting for a password (`NOPASSWD`).
4. Verify the task:
   ```bash
   tld check
   ```
