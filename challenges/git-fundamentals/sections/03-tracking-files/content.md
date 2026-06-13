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
