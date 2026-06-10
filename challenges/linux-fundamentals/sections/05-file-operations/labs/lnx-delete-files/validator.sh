#!/bin/bash
# validator.sh — linux-fundamentals / 05-file-operations / lnx-delete-files
set -euo pipefail

FILE="$HOME/files-test/delete-me.txt"
if [ -f "$FILE" ]; then
  echo "FAIL: The file ~/files-test/delete-me.txt still exists. Run 'rm ~/files-test/delete-me.txt' to delete it."
  exit 1
fi

echo "PASS: File deleted successfully"
exit 0
