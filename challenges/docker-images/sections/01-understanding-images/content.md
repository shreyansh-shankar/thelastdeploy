## Understanding Images

A Docker image is a read-only template used to create one or more containers. Under the hood, an image consists of a series of read-only layers stacked on top of each other. 

---

## 1. Image Layers and Union File Systems

Docker uses a **Union File System (UnionFS)** to merge multiple layers into a single, unified filesystem view inside the container. 
* **Read-Only Layers**: Each instruction in a Dockerfile (like `RUN`, `COPY`, `ADD`) creates a new read-only layer. These layers are immutable and shared across containers.
* **Writable Layer**: When you run a container, Docker adds a thin read-write layer (often called the "Container Layer") on top of the stack. All runtime changes (modifying, deleting, or creating files) occur in this layer and disappear when the container is deleted.

---

## 2. Content Addressability and Caching

Docker images are identified by cryptographic SHA-256 hashes of their content. If a layer's contents (or instructions) are identical, Docker reuse them across different builds.
* **Build Cache**: When building an image, Docker checks if it can reuse existing layers instead of rebuilding them. This makes builds extremely fast.
* **Cache Busting**: If a layer changes (for example, a copied file changes), that layer and all subsequent layers must be rebuilt from scratch.

---

## 3. Image Registries

Images are stored and shared in **Registries**.
* **Docker Hub**: The default public registry hosted by Docker, containing official base images (like `ubuntu`, `nginx`, `node`).
* **Private Registries**: Organizations run custom registries (like GitHub Packages, AWS ECR, or self-hosted Registry instances) to store proprietary images securely.
