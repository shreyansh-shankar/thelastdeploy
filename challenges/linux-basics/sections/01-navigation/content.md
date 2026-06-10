## Navigation and File Operations

In this section, we cover the essential commands you need to navigate the filesystem and manipulate files and folders on a Linux machine.

---

## 1. Finding Your Way Around

```bash
# Print working directory — tells you exactly where you are
pwd

# List directory contents
ls

# List files with detailed information (permissions, size, owner, modification date)
ls -l

# List all files including hidden ones (files starting with a dot)
ls -la
```

---

## 2. Moving through Directories

To change your current working directory, use the `cd` command:

```bash
# Move into a subdirectory
cd documents

# Move up one level (to parent directory)
cd ..

# Go straight to your user home directory (~ represents home)
cd ~

# Go back to the previous directory you were in
cd -
```

---

## 3. Creating Files and Directories

```bash
# Create an empty directory
mkdir my-project

# Create nested directories (-p creates parents if they do not exist)
mkdir -p projects/web-app/src

# Create a new empty file
touch index.js
```

---

## 4. Copying, Moving, and Deleting

```bash
# Copy a file: source target
cp config.json config.json.bak

# Copy a directory recursively (-r)
cp -r src/ backup/

# Move or rename a file/directory
mv old-name.txt new-name.txt
mv file.txt /tmp/

# Remove/delete a file
rm file.txt

# Remove an empty directory
rmdir empty-folder

# Force remove a directory and all its contents recursively (-rf)
rm -rf folder-to-delete
```

> [!CAUTION]
> `rm -rf` is extremely powerful and deletes files permanently without confirmation. Double-check your target path before executing!

---

## Complete the Section

Once you understand these navigation commands, proceed to the next section to learn about file permissions and complete your first Linux practice lab.
