# Observing Cluster State

The first step in any troubleshooting process is gathering information. Kubernetes provides powerful tools to observe the state of the cluster, view system components, and inspect cluster events.

---

## 1. Inspecting Cluster Components

All system components (like the API server, scheduler, controller manager, proxy) run inside the `kube-system` namespace. If the cluster is acting strangely, always check the state of the pods in `kube-system`:
```bash
kubectl get pods -n kube-system
```

---

## 2. Inspecting Node Health

Nodes can become `NotReady` due to disk pressure, memory pressure, or network issues. You can inspect node conditions using:
```bash
kubectl describe node <node-name>
```
Under `Conditions`, you can see the flags for `OutOfDisk`, `MemoryPressure`, `DiskPressure`, `PIDPressure`, and `Ready`.

---

## 3. Reading Cluster Events

Kubernetes maintains a record of events (like scheduling pods, pulling images, volume mounting, container restarts) in each namespace. Observing these events is key to identifying failures:
```bash
# Get all events in the current namespace sorted by creation time
kubectl get events --sort-by='.metadata.creationTimestamp'

# Filter warning events only
kubectl get events --field-selector type=Warning
```
Warning events often highlight immediately why a pod fails to start (e.g. scheduling failure reasons, mount errors, or authentication issues).
