#!/bin/bash
# validator.sh — linux-basics / 02-file-permissions / lnx-chmod-secret
set -euo pipefail

FILE="$HOME/secret-file.txt"

# 1. Check if file exists
if [ ! -f "$FILE" ]; then
  echo "FAIL: File secret-file.txt not found in your home directory ($FILE)"
  exit 1
fi

# 2. Check content of the file
CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "antigravity" ]; then
  echo "FAIL: The file content is not exactly 'antigravity' (got: '$CONTENT')"
  exit 1
fi

# 3. Check file permissions (GNU stat is -c %a, BSD stat is -f %Lp)
PERMS=$(stat -c "%a" "$FILE" 2>/dev/null || stat -f "%Lp" "$FILE" 2>/dev/null)
if [ "$PERMS" != "600" ]; then
  echo "FAIL: File permissions must be exactly 600 (readable/writable only by owner). Got: $PERMS"
  exit 1
fi

echo "PASS: secret-file.txt created, secured with 600 permissions, and contains correct text"
exit 0
