#!/bin/bash
# validator.sh — linux-fundamentals / 05-file-operations / lnx-move-files
set -euo pipefail

SRC="$HOME/files-test/move-me.txt"
DEST="$HOME/files-test/moved.txt"

if [ -f "$SRC" ]; then
  echo "FAIL: The file ~/files-test/move-me.txt still exists. Move/rename it to ~/files-test/moved.txt using 'mv'."
  exit 1
fi

if [ ! -f "$DEST" ]; then
  echo "FAIL: The target file ~/files-test/moved.txt was not found."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$DEST" | xargs)
if [ "$CONTENT" != "moved" ]; then
  echo "FAIL: Content of moved.txt is not correct."
  exit 1
fi

echo "PASS: File moved and renamed successfully"
exit 0
