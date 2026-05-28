## What is Docker?

Docker is a platform that lets you package applications and their dependencies into lightweight, portable units called **containers**.

Before Docker, deploying software meant dealing with the classic problem:

> "It works on my machine."

Docker solves this by bundling everything an application needs — code, runtime, libraries, config — into a single container image that runs identically everywhere.

---

## Containers vs Virtual Machines

You might be thinking: *isn't this just a VM?* Not quite.

| | Virtual Machine | Container |
|---|---|---|
| Includes OS | ✅ Full OS | ❌ Shares host OS kernel |
| Startup time | Minutes | Milliseconds |
| Size | GBs | MBs |
| Isolation | Strong | Strong (but lighter) |
| Use case | Full OS environments | App packaging & deployment |

VMs virtualise the hardware. Containers virtualise the OS. This makes containers **dramatically faster and lighter** than VMs.

---

## Key Concepts

### Image
A read-only template used to create containers. Think of it like a class in OOP — the blueprint.

```bash
# An image is pulled from a registry
docker pull nginx
```

### Container
A running instance of an image. Like an object instantiated from a class.

```bash
# A container is created from an image
docker run nginx
```

### Registry
A storage and distribution system for Docker images. Docker Hub is the default public registry — it hosts official images for nginx, postgres, node, python, and thousands more.

### Dockerfile
A text file with instructions to build a custom image.

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

---

## Why Docker Matters in DevOps

Docker is foundational to modern DevOps because it enables:

- **Consistent environments** — dev, staging, and prod run the same image
- **Fast CI/CD pipelines** — containers spin up in milliseconds
- **Microservices** — each service runs in its own isolated container
- **Kubernetes** — the entire K8s ecosystem is built on containers

Nearly every DevOps tool you'll encounter — Kubernetes, GitHub Actions, Jenkins, Terraform Cloud — uses containers under the hood.

---

## Quick Recap

- Docker packages apps into **containers**
- Containers share the host OS kernel — faster and lighter than VMs
- An **image** is the blueprint; a **container** is the running instance
- Images are stored in **registries** like Docker Hub
- Docker is the foundation of modern CI/CD and Kubernetes