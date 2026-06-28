# Kubectl Basics

`kubectl` is the Kubernetes command-line tool. It allows you to run commands against Kubernetes clusters, allowing you to deploy applications, inspect and manage cluster resources, and view logs.

## Kubectl Syntax

The common syntax of `kubectl` commands is:
```bash
kubectl [command] [TYPE] [NAME] [flags]
```
- **command**: Specifies the operation you want to perform (e.g. `create`, `get`, `describe`, `delete`).
- **TYPE**: Specifies the resource type (e.g. `pods`, `services`, `nodes`). Case-insensitive, singular, plural, or abbreviated forms are accepted (e.g. `pod`, `pods`, `po`).
- **NAME**: Specifies the name of the resource. Case-sensitive. If omitted, details for all resources of the specified TYPE are returned.
- **flags**: Specifies optional flags (e.g. `-o json` to change output format, `-n` to specify namespace).

---

## Essential Commands

### 1. Interrogating the Cluster
```bash
# Get cluster status and API endpoint details
kubectl cluster-info

# List all nodes in the cluster
kubectl get nodes
```

### 2. Getting Resources
```bash
# List all pods in the default namespace
kubectl get pods

# List pods with more details (like IP and node name)
kubectl get pods -o wide

# Get details of a specific service
kubectl get svc kubernetes
```

### 3. Inspecting Resource Details
```bash
# Describe a specific pod to see events and configuration
kubectl describe pod nginx-pod
```

### 4. Creating Resources (Imperative)
```bash
# Spin up an nginx pod directly
kubectl run my-nginx --image=nginx
```
