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
