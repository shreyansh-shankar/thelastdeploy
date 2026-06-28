#!/bin/bash
# validator.sh — k8s-workloads / 03-replicasets-and-scaling / k8s-self-healing-demo
set -euo pipefail

CONTEXT="kind-tld-k8s-self-healing-demo"
FILE="$HOME/k8s-workloads/new-pod.txt"
INIT_FILE="$HOME/k8s-workloads/initial-pod.txt"

if [ ! -f "$INIT_FILE" ]; then
  echo "FAIL: Initial pod tracking file missing. Please restart the lab."
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "FAIL: $FILE does not exist. Did you write the new pod name to it?"
  exit 1
fi

INITIAL_POD=$(tr -d '[:space:]' < "$INIT_FILE")
USER_POD=$(tr -d '[:space:]' < "$FILE")

# 1. Get currently running pods for app-deploy
CURRENT_PODS=$(kubectl --context="$CONTEXT" get pods -l app=app-deploy -o jsonpath='{.items[*].metadata.name}')

# 2. Check if USER_POD matches any current pod
MATCH=false
for cp in $CURRENT_PODS; do
  if [ "$cp" = "$USER_POD" ]; then
    MATCH=true
    break
  fi
done

if [ "$MATCH" = "false" ]; then
  echo "FAIL: The pod name '$USER_POD' does not match any currently running pod of deployment 'app-deploy'."
  echo "Currently running: '$CURRENT_PODS'"
  exit 1
fi

# 3. Check if USER_POD is different from INITIAL_POD
if [ "$USER_POD" = "$INITIAL_POD" ]; then
  echo "FAIL: The pod name in $FILE is the same as the initial pod '$INITIAL_POD'. You must delete the pod first to trigger recreation."
  exit 1
fi

echo "PASS: Self-healing demo verified! New pod '$USER_POD' spawned automatically after deletion of '$INITIAL_POD'!"
exit 0
