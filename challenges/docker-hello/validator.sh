#!/usr/bin/env bash
# challenges/docker-hello/validator.sh
# Checks that hello-world container was run and exited cleanly.

set -euo pipefail

# Look for a recently exited hello-world container
RESULT=$(docker ps -a --filter "ancestor=hello-world" --filter "status=exited" --format "{{.Status}}" | head -1)

if [[ -z "$RESULT" ]]; then
  echo "FAIL: No exited hello-world container found. Run: docker run hello-world"
  exit 1
fi

# Confirm exit code was 0
EXIT_CODE=$(docker ps -a --filter "ancestor=hello-world" --filter "status=exited" --format "{{.Status}}" | grep -oP 'Exited \(\K[0-9]+' | head -1)

if [[ "$EXIT_CODE" != "0" ]]; then
  echo "FAIL: hello-world container exited with code $EXIT_CODE (expected 0)"
  exit 1
fi

echo "PASS: hello-world ran and exited cleanly"
exit 0