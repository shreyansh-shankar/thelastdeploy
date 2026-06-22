## Networking Basics

By default, Docker isolates containers from the host network and other containers using isolated network namespaces. To allow containers to connect to the outside world, receive traffic, or talk to each other, Docker uses **Network Drivers**.

---

## 1. Core Docker Network Drivers

Docker provides several built-in network drivers to support different container topologies:

* **bridge (Default)**: Creates a private internal network namespace on the host. All containers connected to this network get private IP addresses (e.g. `172.17.0.x`) and can communicate. Outgoing connections to the internet are supported via Network Address Translation (NAT).
* **host**: Removes network isolation between the container and the Docker host. The container shares the host's networking stack directly (e.g. running a web server on port 80 inside the container binds port 80 directly on the host interface).
* **none**: Completely disables networking for the container. The container gets a loopback interface but has no access to the host network or other containers. Great for running isolated batch processing tasks.
* **overlay**: Used for multi-host networking, allowing containers across different Docker hosts (Swarm or Kubernetes clusters) to communicate securely.

---

## 2. The Default Bridge (`docker0`)

When you install Docker, it automatically creates a virtual bridge interface named `docker0` on your host. If you start a container without specifying a network flag:
```bash
docker run -d nginx
```
Docker attaches the container to this default bridge. 

### Limitations of the Default Bridge
While the default bridge allows containers to communicate via IP addresses, it has one major limitation: **it does not support automatic container-name DNS resolution**. To communicate using container names as hostnames, you must create a **User-Defined Custom Network**, which we will explore in later sections.
