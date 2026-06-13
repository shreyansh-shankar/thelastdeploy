Once you have made one or more commits, you can review the revision log using `git log`.

### The `git log` Command
By default, `git log` displays a list of commits in reverse chronological order:
```bash
git log
```
Each entry shows:
- **Commit Hash**: A unique 40-character SHA-1 checksum identifying the commit object.
- **Author**: Name and email of the user who made the commit.
- **Date**: Timestamp of when the commit was saved.
- **Commit Message**: Explanation of the changes.

### Helpful Flags
- `--oneline`: Displays each commit on a single line (short hash and commit message).
- `-n <limit>`: Restricts log output to the last `<limit>` commits.
```bash
# View last 3 commits briefly
git log --oneline -n 3
```
