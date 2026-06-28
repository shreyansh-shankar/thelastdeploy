# Kubernetes Cluster Architecture

A Kubernetes cluster consists of a set of worker machines, called **nodes**, that run containerized applications. Every cluster has at least one worker node.

The worker node(s) host the **Pods** (the basic execution units of K8s). The **Control Plane** manages the worker nodes and the Pods in the cluster.

---

## Control Plane Components

The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events.

1. **kube-apiserver**: The API server is the front end for the Kubernetes control plane. It exposes the Kubernetes API and intercepts all cluster administrative queries.
2. **etcd**: Consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data.
3. **kube-scheduler**: Watches for newly created Pods with no assigned node, and selects a node for them to run on based on resource requirements, policy constraints, and affinity specifications.
4. **kube-controller-manager**: Runs controller processes. These include:
   - *Node controller*: Notices and responds when nodes go down.
   - *Job controller*: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks.
   - *EndpointSlice controller*: Populates EndpointSlice objects (to link Services and Pods).
   - *ServiceAccount controller*: Creates default accounts and API access tokens for new namespaces.

---

## Node Components

Node components run on every node, maintaining running pods and providing the Kubernetes runtime environment.

1. **kubelet**: An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod and that they are healthy.
2. **kube-proxy**: A network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept (routing connections to correct backend containers).
3. **Container Runtime**: The software that is responsible for running containers (e.g. containerd, Docker Engine, CRI-O).
