## Terminal Basics

To interact with Linux, we use a command shell through a terminal application. In this section, you'll learn how to start a shell and run basic commands.

---

## 1. Terminal vs Shell

- **Terminal**: A terminal is the wrapper application that displays text and takes input from your keyboard.
- **Shell**: The shell is the actual program running behind the terminal that interprets the commands you type (e.g. `bash`, `zsh`, or `sh`).

---

## 2. Command Syntax

Most commands follow a standard syntax pattern:

```bash
command [options] [arguments]
```

- **command**: The program you want to run (e.g., `ls` or `echo`).
- **options/flags**: Modify the behavior of the command. They usually start with a single hyphen `-` or double hyphens `--` (e.g., `-l` or `--help`).
- **arguments**: The target elements the command operates on (e.g., a file path).

---

## Lab Tasks

### Task 1: Open your first Linux terminal
1. Start the lab in your terminal:
   ```bash
   tld start lnx-open-terminal
   ```
2. Prove your terminal is working by creating an empty file named `terminal_ready` in your home directory (`~`).
3. Verify the task to earn your XP:
   ```bash
   tld check
   ```

### Task 2: Run your first command
1. Start the lab in your terminal:
   ```bash
   tld start lnx-run-first-command
   ```
2. Create a file named `first_command.txt` in your home directory containing the exact text `hello devlab` (remember to use standard shell redirection).
3. Verify the task:
   ```bash
   tld check
   ```
