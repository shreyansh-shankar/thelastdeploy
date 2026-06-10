## Viewing Files

When managing files or reading system logs in a headless Linux environment, we use specialized CLI command-line utilities to inspect contents.

---

## 1. Concat and Print (`cat`)

The `cat` command prints the entire contents of a file directly to the terminal stdout.

```bash
cat short-file.txt
```

> [!TIP]
> Use `cat` only for short files. If you print a very large log file with `cat`, it will flood your terminal screen!

---

## 2. Interactive Viewing (`less`)

For larger files, `less` is the preferred tool. It loads files lazily (without reading the entire file into memory at once) and allows you to scroll up and down page-by-page.

- **Open a file**: `less application.log`
- **Navigate**: Use the **Arrow keys** or **Page Up / Page Down**.
- **Search**: Press `/` followed by the search keyword and hit **Enter**. Use `n` to go to the next match, and `N` to go to the previous.
- **Quit**: Press `q`.

---

## 3. Head and Tail (`head` / `tail`)

To view only the beginning or end of a file:

- **head**: Prints the first 10 lines of a file by default.
  ```bash
  # View first 15 lines (-n 15)
  head -n 15 app.log
  ```
- **tail**: Prints the last 10 lines of a file by default. Excellent for viewing the latest entries in logs.
  ```bash
  # View last 20 lines
  tail -n 20 system.log
  
  # Follow logs in real-time (-f) as new lines are appended
  tail -f system.log
  ```

---

## Lab Tasks

### Task 1: View files using cat
1. Start the lab in your terminal:
   ```bash
   tld start lnx-cat-file
   ```
2. You will find a file named `short.txt` inside `~/view-test/`. View its contents to find the secret code.
3. Save that secret code to a new file named `code.txt` inside `~/view-test/`.
4. Verify the task to earn your XP:
   ```bash
   tld check
   ```

### Task 2: Search logs using less
1. Start the lab in your terminal:
   ```bash
   tld start lnx-less-logfile
   ```
2. You will find a file named `system.log` inside `~/view-test/`. Look up the timestamp of the connection timeout error (`ERR_CONN_TIMEOUT`).
3. Save the exact timestamp string to a file named `error_time.txt` inside `~/view-test/`.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 3: Inspect files with head and tail
1. Start the lab in your terminal:
   ```bash
   tld start lnx-head-tail
   ```
2. You will find a file named `growth.txt` inside `~/view-test/`. Extract the very last line of the file.
3. Save that last line to a file named `end.txt` inside `~/view-test/`.
4. Verify the task:
   ```bash
   tld check
   ```
