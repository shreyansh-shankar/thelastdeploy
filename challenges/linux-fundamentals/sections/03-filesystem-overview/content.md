## Filesystem Overview

In Linux, all files and directories are organized under a single root directory `/`, forming a hierarchical tree structure. This differs from Windows, which uses drive letters like `C:` or `D:`.

---

## 1. Directory Layout

Here are some of the most critical standard directories in the Linux filesystem:

| Directory | Purpose |
| --- | --- |
| `/` | The Root directory. The base of the filesystem tree. |
| `/bin` | User Binaries. Contains essential command binaries like `ls`, `cd`, and `pwd`. |
| `/etc` | System Configurations. Contains startup scripts and configuration files. |
| `/home` | Home Directories. Contains personal files and preferences for standard users. |
| `/var` | Variable Files. Stored dynamic files like logs (`/var/log`) and temporary mail spools. |
| `/tmp` | Temporary Files. Contains files that are cleared on system boot. |
| `/root` | Root Home. The home directory for the superuser/administrator. |

---

## 2. Absolute vs Relative Paths

- **Absolute Path**: The complete path starting from the root directory `/` (e.g. `/home/user/documents/report.txt`).
- **Relative Path**: A path relative to your current working directory (e.g. `documents/report.txt` if you are already in `/home/user`).

---

## Lab Task

### Identify standard system directories
1. Start the lab in your terminal:
   ```bash
   tld start lnx-identify-directories
   ```
2. Identify which standard system directory contains system-wide configuration files (e.g., configurations, startup scripts).
3. Create a file named `directories.txt` in your home directory and write its absolute path inside it.
4. Verify the task to earn your XP:
   ```bash
   tld check
   ```
