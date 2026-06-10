## File Operations

Managing files and directories is a core skill for any Linux user. The shell provides standard tools to create, copy, move, rename, and delete files.

---

## 1. Creating Files and Folders

- **touch**: Create an empty file or update its modification time.
  ```bash
  touch index.html
  ```
- **mkdir**: Create a new directory.
  ```bash
  mkdir projects
  # Create nested directory structures (-p creates parent folders as needed)
  mkdir -p projects/web-app/src
  ```

---

## 2. Copying Files and Folders (`cp`)

Copying files takes a source path and a destination path:

- **Copy a file**: `cp config.json config.json.bak`
- **Copy a folder recursively**: `cp -r src/ backup/`

---

## 3. Moving and Renaming (`mv`)

The `mv` command is used for both moving files to different directories and renaming them:

- **Rename a file**: `mv oldname.txt newname.txt`
- **Move a file**: `mv file.txt /tmp/`

---

## 4. Deleting Files and Folders (`rm`)

- **Remove a file**: `rm file.txt`
- **Remove an empty folder**: `rmdir empty-folder/`
- **Remove a folder and its contents recursively and forcibly**: `rm -rf projects/`

> [!WARNING]
> `rm` does not have a recycle bin. Deleted files are permanently gone! Be extremely careful when running `rm -rf`.
