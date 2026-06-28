# Common Production Failures

Beyond individual pod or service failures, production clusters often experience pattern failures that are harder to diagnose because they involve multiple interacting components.

---

## 1. Missing Configuration Objects

Pods can fail to start if they reference ConfigMaps or Secrets that don't exist yet. The pod enters `ContainerCreating` state and never progresses.

**Triage**:
```bash
kubectl describe pod <pod-name>
```
Look for events like: `MountVolume.SetUp failed for volume "..." : configmap "..." not found`

**Fix**: Create the missing ConfigMap or Secret before the Pod starts.

---

## 2. Broken Health Checks

If a Pod's `livenessProbe` or `readinessProbe` is misconfigured (wrong path, wrong port), the kubelet will:
- **Liveness**: Kill the container and restart it → causing `CrashLoopBackOff`.
- **Readiness**: Mark the pod as `NotReady` → removing it from Service endpoints.

**Triage**: Check probe configuration in `kubectl describe pod` under `Containers` section.

---

## 3. Resource Exhaustion

When nodes run out of CPU or Memory, the scheduler can no longer place new pods (`Pending`). Existing pods may be OOM-killed.

**Triage**: Check node resource usage:
```bash
kubectl describe node <node-name>
kubectl top nodes
kubectl top pods
```

Look for `OOMKilled` in pod status conditions (`kubectl get pod <pod> -o json | grep -A5 reason`).

---

## 4. Triage Checklist

When production is down, follow this structured approach:
1. `kubectl get pods --all-namespaces` — identify failing pods
2. `kubectl describe pod <pod>` — read events and conditions
3. `kubectl logs <pod>` / `kubectl logs <pod> --previous` — read app output
4. `kubectl get events --sort-by='.metadata.creationTimestamp'` — scan for cluster-wide warnings
5. `kubectl describe node` — check node pressure conditions
