# Debugging Deployments

Deployments automate rolling updates. However, configuration errors (such as incorrect image tags, bad environment variables, or config references) can cause rollouts to freeze, leaving users with half-migrated workloads.

---

## 1. Monitoring Rollout Failures

If you update a deployment spec, Kubernetes starts a new rollout. If the rollout is blocked:
```bash
kubectl rollout status deployment/<deployment-name>
```
This command blocks and displays the current state of the update (e.g. `Waiting for deployment "rollout-app" rollout to finish: 1 old replicas are pending termination...`).

---

## 2. Inspecting the Root Cause

When a rollout freezes, the new ReplicaSet attempts to spin up pods but they fail.
To debug:
1. **Find ReplicaSets**: List the ReplicaSets for the deployment:
   ```bash
   kubectl get replicaset -l app=<app-label>
   ```
   You will see the old ReplicaSet (with ready replicas) and the new ReplicaSet (with desired replicas but 0 ready).
2. **Describe new Pods**: Describe the pods created by the new ReplicaSet to check their events and logs.

---

## 3. Rollout Undo (Rollback)

To immediately restore service while debugging the configuration issue, undo the rollout:
```bash
kubectl rollout undo deployment/<deployment-name>
```
This stops the current rollout and reverts back to the last known working ReplicaSet configuration.
