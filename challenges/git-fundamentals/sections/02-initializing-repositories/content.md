To start tracking a project with Git, you must initialize a Git repository in the project's root directory.

### The `git init` Command
Running `git init` converts an existing, unversioned directory into a Git repository or creates a new empty repository.
This command creates a hidden directory named `.git` in the project root. This `.git` folder contains all the Git metadata, objects, refs, and configuration settings that track your project changes.

```bash
# Initialize a repository in the current directory
git init

# Or initialize a repository inside a specific directory
git init my-project
```

---

## Lab Tasks

### Task 1: Initialize a New Repository
1. Start the lab in your terminal:
   ```bash
   tld start git-create-repository
   ```
2. Initialize a Git repository inside the `~/git-challenge` directory.
3. Verify the task to earn your XP:
   ```bash
   tld check
   ```
