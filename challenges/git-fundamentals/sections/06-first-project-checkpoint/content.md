Let's synthesize all the concepts you have learned in this module to save your first complete project state:
1. Initialize a new Git repository.
2. Configure `.gitignore` to prevent tracking temporary files.
3. Create the main source file `index.html`.
4. Stage and commit all files to record the initial stable revision of your project.

Completing this lab validates that you can configure and manage the basic lifecycle of a local Git workspace.

---

## Lab Tasks

### Task 1: Save Your Project State
1. Start the lab in your terminal:
   ```bash
   tld start git-save-project-state
   ```
2. Initialize a new Git repository inside the `~/git-challenge` directory.
3. Create a `.gitignore` file in `~/git-challenge` configured to ignore files with the `.tmp` extension (e.g., `*.tmp`).
4. Create an `index.html` file in the `~/git-challenge` directory.
5. Stage and commit both `index.html` and `.gitignore` to the repository with a commit message. Make sure the repository status is clean.
6. Verify the task to earn your XP:
   ```bash
   tld check
   ```
