## Pods: The Kubernetes Atomic Unit

Kubernetes is a container orchestration platform. Unlike Docker which runs individual containers directly, Kubernetes runs containers wrapped inside an abstraction called a **Pod**.

---

## 1. What is a Pod?

A **Pod** is the smallest deployable unit in Kubernetes. It represents a single instance of a running process in your cluster.

A Pod can contain:
- A single container (most common pattern).
- Multiple tightly-coupled containers that need to share resources (such as storage volumes or networking).

Every pod gets its own unique IP address within the cluster, and all containers within a single pod share the same network namespace (meaning they can talk to each other on `localhost`).

---

## 2. Using Kind for Local Kubernetes

To run Kubernetes locally without paying for cloud providers, we use **Kind** (Kubernetes in Docker).

```bash
# Check if Kind is installed and get clusters
kind get clusters
```

---

## 3. Basic kubectl Commands

`kubectl` is the command-line tool used to control Kubernetes clusters.

```bash
# Run a simple Nginx pod in the default namespace
kubectl run nginx-pod --image=nginx:alpine

# List all pods in the current namespace
kubectl get pods

# List pods with more details (like IPs and node names)
kubectl get pods -o wide

# Describe a specific pod (useful for troubleshooting/viewing events)
kubectl describe pod nginx-pod

# View container logs inside a pod
kubectl logs nginx-pod

# Delete a running pod
kubectl delete pod nginx-pod
```

---

## Lab Task

Spin up a local Kubernetes cluster and launch a Pod:

1. Start the lab:
   ```bash
   tld start k8s-first-pod
   ```
   *Note: This will spin up a local Kind cluster named `tld-k8s-first-pod` in the background (non-blocking). It might take a minute or two to be fully ready.*
2. Set your kubectl context to point to the new Kind cluster:
   ```bash
   kubectl cluster-info --context kind-tld-k8s-first-pod
   ```
3. Run a new Pod named `nginx-pod` using the official `nginx` image.
4. Wait for the pod's status to show as `Running`.
5. Run the validator to verify your cluster status and pod presence:
   ```bash
   tld check
   ```
