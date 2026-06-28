# Pods vs Deployments

While a Pod is the basic execution unit of Kubernetes, you rarely deploy standalone Pods in production environments. Instead, you manage them using higher-level abstractions like **Deployments**.

---

## Standalone Pod Limitations

Standalone Pods have serious limitations for production deployment:
- **No Self-Healing**: If a standalone Pod crashes due to code errors, Kubernetes restarts it inside the container. However, if the underlying physical server (node) hosting that Pod fails, the Pod is deleted permanently and not rescheduled.
- **No Scaling**: To run multiple replicas of a Pod, you would have to manually create and manage each instance.
- **No Rollouts / Updates**: Updating a standalone Pod's image version requires manual deletion and recreation, causing downtime.

---

## What is a Deployment?

A **Deployment** is a declarative Kubernetes controller that manages a set of identical Pods. You describe the desired state in a Deployment manifest, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

Deployments solve all limitations of standalone Pods:
- **Self-Healing**: If a node fails, the Deployment Controller notices the replica count is below the desired count and spins up new Pods on healthy nodes.
- **Declarative Scaling**: Scale replicas up or down by changing a single number.
- **Zero-Downtime Rollouts**: Update application versions using rolling updates, keeping old pods running until new ones are healthy.
- **Rollbacks**: Revert back to previous deployment versions if a rollout fails.
