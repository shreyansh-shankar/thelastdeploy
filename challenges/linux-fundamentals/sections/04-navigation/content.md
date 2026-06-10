## Navigation

Navigating the Linux filesystem is done using simple built-in shell tools. The commands `pwd` and `cd` form the bedrock of navigation.

---

## 1. Print Working Directory (`pwd`)

To see exactly where you are in the filesystem tree, run `pwd`. This command returns the absolute path of your current directory.

```bash
pwd
# Outputs: /home/fsociety
```

---

## 2. Change Directory (`cd`)

To move to a different directory, use `cd` followed by the directory path.

- **Move into a directory**: `cd documents`
- **Move to your user's Home directory**: `cd` or `cd ~`
- **Move to the parent folder**: `cd ..`
- **Move to the root of the filesystem**: `cd /`

---

## 3. Dot References

- `.`: Represents the current directory.
- `..`: Represents the parent directory.
