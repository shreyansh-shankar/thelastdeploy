In Git, files pass through three states before being safely recorded in the history database:
1. **Working Directory**: Modifying local files that are not yet tracked or have unstaged modifications.
2. **Staging Area (Index)**: Staging files with `git add` to prepare them for the next commit.
3. **Repository (.git directory)**: Saving the staged snapshot to project history with `git commit`.

### The `git add` Command
Stages untracked or modified files, adding them to the Git index:
```bash
# Stage a specific file
git add README.md

# Stage all files in the current folder
git add .
```

### The `git commit` Command
Saves the staged snapshot of files to the local repository database. Always write a meaningful, concise commit message:
```bash
git commit -m "Initialize project with README document"
```

---

## Lab Tasks

### Task 1: Stage a Modified File
1. Start the lab in your terminal:
   ```bash
   tld start git-stage-file
   ```
2. Add the existing `README.md` file in the `~/git-challenge` directory to the Git staging area (index) without committing it.
3. Verify the task to earn your XP:
   ```bash
   tld check
   ```

### Task 2: Commit Your Staged Changes
1. Start the lab in your terminal:
   ```bash
   tld start git-commit-changes
   ```
2. Commit the staged `README.md` changes to the repository in `~/git-challenge`. Ensure the working tree is clean.
3. Verify the task:
   ```bash
   tld check
   ```
