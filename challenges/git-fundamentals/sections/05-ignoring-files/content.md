Often, you will have temporary files, build artifacts, compiled outputs, local configs, or dependency folders (like `node_modules` or `.venv`) that you do not want to commit or track in Git.

### The `.gitignore` File
You can prevent Git from tracking these files by listing match patterns inside a special text file named `.gitignore` at the root of your project directory.

#### Common Patterns:
```text
# Ignore all files ending with .log
*.log

# Ignore a specific file
config.local.json

# Ignore a folder
node_modules/
dist/

# Ignore files in a specific directory
logs/*.txt
```

---

## Lab Tasks

### Task 1: Configure Git Ignore List
1. Start the lab in your terminal:
   ```bash
   tld start git-configure-gitignore
   ```
2. Create or edit a `.gitignore` file inside the `~/git-challenge` directory.
3. Configure it to ignore all files ending in `.log` (e.g., `*.log`).
4. Verify the task to earn your XP:
   ```bash
   tld check
   ```
