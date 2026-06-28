# What is a Pod?

A **Pod** is the smallest deployable unit of computing that you can create and manage in Kubernetes.

A Pod represents a single instance of a running process in your cluster. It can contain one or more containers (such as Docker containers) that are relatively tightly coupled.

---

## Key Characteristics of a Pod

- **Shared Network**: All containers inside a Pod share the same network namespace, meaning they share the same IP address and port space. They can communicate with each other using `localhost`.
- **Shared Storage**: A Pod can specify a set of shared storage volumes. All containers in the Pod can access the shared volumes, allowing them to share data easily.
- **Single Host**: All containers inside a Pod are always scheduled and run on the same physical or virtual node.
- **Ephemeral**: Pods are not self-healing or durable. If a Pod node dies, the Pod is deleted and not rescheduled unless managed by a higher-level controller (like a Deployment or ReplicaSet).

---

## Single-Container vs. Multi-Container Pods

- **Single-Container Pod**: The most common Kubernetes use case; a Pod wraps a single container, and Kubernetes manages the Pod rather than the container directly.
- **Multi-Container Pod**: A Pod containing helper containers that assist the primary application container (e.g. sidecars for logging, service mesh proxies, or data syncers).
