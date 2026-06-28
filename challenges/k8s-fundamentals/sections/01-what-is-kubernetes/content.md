# What is Kubernetes?

Kubernetes (often abbreviated as **K8s**, where the "8" represents the eight letters between "K" and "s") is an open-source container orchestration engine. It was originally designed by Google, drawing from their experience running production workloads at scale using an internal system called Borg, and is now maintained by the Cloud Native Computing Foundation (CNCF).

At its core, Kubernetes simplifies the deployment, scaling, and management of containerized applications.

## Why Do We Need Container Orchestration?

In modern microservices architectures, applications are split into dozens or hundreds of containers. Manually managing these containers on a single host is challenging, but running them across a cluster of multiple virtual or physical servers introduces significant complexity:
- How do you decide which host should run which container?
- How do you scale containers up or down based on traffic?
- How do you handle container crashes or hardware failures?
- How do containers discover and communicate with each other?

Kubernetes answers these questions by treating a pool of servers as a single, unified computing resource.

## Key Features of Kubernetes

1. **Service Discovery and Load Balancing**: K8s can expose a container using a DNS name or their own IP address. If traffic to a container is high, K8s can load-balance and distribute network traffic.
2. **Storage Orchestration**: Automatically mount local storage, public cloud providers (like AWS, GCP, or Azure), or network storage systems (like NFS) to your containers.
3. **Automated Rollouts and Rollbacks**: Describe the desired state for your deployed containers, and K8s can change the actual state to the desired state at a controlled rate (e.g. updating an app version without downtime).
4. **Self-Healing**: K8s restarts containers that fail, replaces and reschedules containers when nodes die, and kills containers that don't respond to user-defined health checks.
5. **Secret and Configuration Management**: Store and manage sensitive information, such as passwords, OAuth tokens, and SSH keys, without rebuilding container images or exposing secrets in stack configurations.
