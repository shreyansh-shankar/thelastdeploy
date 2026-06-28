# Rollouts and Rollbacks

One of the major benefits of using Deployments is the ability to update container images with **zero downtime** and quickly revert back to a previous state if something breaks.

---

## 1. Updating Deployment Container Images

When you modify the Pod template spec of a Deployment (e.g. updating the container image), a new **rollout** is triggered automatically:
```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1
```
This updates the container named `nginx` in `nginx-deployment` to use the `nginx:1.16.1` image.

---

## 2. Checking Rollout Progress

To monitor the rollout progress and verify that the deployment successfully scales up the new ReplicaSet and tears down the old one:
```bash
kubectl rollout status deployment/nginx-deployment
```

To see the revision history of rollouts for a deployment:
```bash
kubectl rollout history deployment/nginx-deployment
```

---

## 3. Undoing Updates (Rollbacks)

If an update is broken (e.g. image name typo, configuration bugs), you can roll back the deployment to the previous version:
```bash
kubectl rollout undo deployment/nginx-deployment
```

To roll back to a specific revision from the history list:
```bash
kubectl rollout undo deployment/nginx-deployment --to-revision=2
```
This creates a new revision copying the configuration of revision 2.
