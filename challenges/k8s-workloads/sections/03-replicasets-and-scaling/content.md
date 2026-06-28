# ReplicaSets and Scaling

A Deployment does not manage Pods directly. Instead, it delegates pod management to a **ReplicaSet**.

---

## What is a ReplicaSet?

A **ReplicaSet**'s purpose is to maintain a stable set of replica Pods running at any given time.
- When you create a Deployment, the Deployment Controller automatically creates a ReplicaSet in the background.
- The ReplicaSet uses labels to identify and track its pods.

---

## Horizontal Scaling

Scaling an application running on Kubernetes is extremely fast because you only need to update the desired replica count. The ReplicaSet handles the creation or deletion of container instances.

### 1. Scaling Imperatively
You can scale a deployment directly from the CLI:
```bash
kubectl scale deployment nginx-deployment --replicas=5
```

### 2. Scaling Declaratively
Update the `spec.replicas` field inside your deployment manifest and run `kubectl apply -f deployment.yaml`.

---

## Self-Healing

One of Kubernetes' primary features is **Self-Healing**:
- If a pod crashes due to application errors, the local node `kubelet` restarts the container inside the pod.
- If a pod is deleted (e.g. server hardware crashes, or manual deletion), the ReplicaSet controller notices that the *current count* of running pods does not match the *desired replica count*.
- The ReplicaSet scheduler immediately schedules a new replacement pod to run on any available node in the cluster.
