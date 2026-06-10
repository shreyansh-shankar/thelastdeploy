## Getting Help

Linux command shell utilities have a vast array of features and options. You don't need to memorize everything—instead, learn how to find information dynamically on the system using `man` pages and help flags.

---

## 1. Reference Manuals (`man`)

The `man` command displays the reference manual page for any command installed on your system.

- **Look up a manual**: `man mkdir`
- **Navigate**: Use the **Arrow keys** to scroll, and press `q` to exit.

---

## 2. Help Flags (`--help` or `-h`)

Almost every Linux command supports a `--help` or `-h` option, which prints a concise summary of the command's flags, usage patterns, and exit codes directly to stdout.

```bash
ls --help
docker run --help
```

---

## Lab Tasks

### Task 1: Look up options in man pages
1. Start the lab in your terminal:
   ```bash
   tld start lnx-man-pages
   ```
2. Open system manual using `man mkdir` to find the flag that allows creating parent directories as needed.
3. Save that flag (exactly `-p` or `--parents`) to a file named `parents_flag.txt` inside `~/help-test/`.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Explore commands using help flags
1. Start the lab in your terminal:
   ```bash
   tld start lnx-help-flags
   ```
2. Use the command helper (`--help` or `-h`) for `ls` and find the option that sorts directory listings by file size.
3. Save that flag (exactly `-S`) to a file named `size_flag.txt` inside `~/help-test/`.
4. Verify the task:
   ```bash
   tld check
   ```
```
