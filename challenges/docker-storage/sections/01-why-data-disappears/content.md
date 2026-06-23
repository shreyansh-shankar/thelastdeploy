## Why Data Disappears

By default, all files created inside a container are stored on a writeable container layer. If the container is deleted, this layer is also deleted, and any data created during the container's lifecycle is lost.

---

## 1. Container Ephemerality

Docker containers are designed to be disposable (ephemeral). When a container is stopped and removed, its thin read-write layer is permanently deleted. This means:
* Any files you created or modified inside the container are lost.
* Other containers cannot easily access this data.
* Writing directly to the container's writeable layer requires a storage driver to manage the filesystem, which reduces write performance compared to direct host filesystem access.

---

## 2. Docker Storage Options

To solve these limitations, Docker provides three main ways to mount files from the host system into a container:

1. **Bind Mounts**: Link a specific file or directory on your host machine to a directory inside the container.
2. **Named Volumes**: Docker-managed storage areas stored on the host filesystem (`/var/lib/docker/volumes/`). Volumes are the preferred mechanism for persisting data.
3. **tmpfs Mounts**: Store data in the host system's memory only (never written to disk). Useful for temporary sensitive data (like tokens or private keys) to improve performance and security.
