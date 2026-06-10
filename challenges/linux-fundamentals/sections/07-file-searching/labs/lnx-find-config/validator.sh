#!/bin/bash
# validator.sh — linux-fundamentals / 07-file-searching / lnx-find-config
set -euo pipefail

FILE="$HOME/search-test/found_conf.txt"
if [ ! -f "$FILE" ]; then
  echo "FAIL: File ~/search-test/found_conf.txt not found. Find the config file path and save it to found_conf.txt."
  exit 1
fi

CONTENT=$(tr -d '\r\n' < "$FILE" | xargs)
EXPECTED=$(eval echo \$HOME/search-test/configs/prod/app.conf)
if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "FAIL: Path in ~/search-test/found_conf.txt ($CONTENT) does not match expected path ($EXPECTED)."
  exit 1
fi

echo "PASS: Config file found successfully"
exit 0
