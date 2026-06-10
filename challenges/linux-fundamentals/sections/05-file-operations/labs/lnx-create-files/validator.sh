#!/bin/bash
# validator.sh — linux-fundamentals / 05-file-operations / lnx-create-files
set -euo pipefail

FILE="$HOME/files-test/newfile.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/files-test/newfile.txt not found. Please create the files-test directory and touch newfile.txt inside it, then write the text 'created' inside it."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
if [ "$CONTENT" != "created" ]; then
  echo "FAIL: Contents of ~/files-test/newfile.txt must be 'created'. Got: '$CONTENT'"
  exit 1
fi

echo "PASS: Nested file created successfully"
exit 0
