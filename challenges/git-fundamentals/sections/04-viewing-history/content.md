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

---

## Lab Tasks

### Task 1: Inspect Repository Log
1. Start the lab in your terminal:
   ```bash
   tld start git-inspect-history
   ```
2. Find the full 40-character commit hash of the latest commit in the `~/git-challenge` repository.
3. Save this commit hash (without any other text) to a file named `latest_commit.txt` in the `~/git-challenge` directory.
4. Verify the task to earn your XP:
   ```bash
   tld check
   ```
