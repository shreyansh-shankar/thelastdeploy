## Images vs Containers

Understanding the relationship and differences between **images** and **containers** is the key to mastering Docker's mental model.

---

## 1. The Class vs Instance Analogy

If you are familiar with Object-Oriented Programming (OOP), here is the perfect way to think about them:

* **Image = Class**: A read-only template, blueprint, or snapshot. It contains the application code, runtimes, environment variables, libraries, and default commands. It doesn't run; it just sits on your disk.
* **Container = Object / Instance**: A running process instantiated from the image. It represents the active execution of the blueprint. You can start, stop, restart, and remove containers.

```
+---------------------------+        Instantiate        +----------------------------+
|        Docker Image       |  ---------------------->  |      Docker Container      |
|  (Read-only blueprint)    |      `docker run`         |  (Writeable running process) |
+---------------------------+                           +----------------------------+
```

---

## 2. Under the Hood: Copy-on-Write (CoW) Layers

Docker images are composed of multiple **read-only layers**. When you build or pull an image, these layers are stacked on top of each other.

When you run a container:
1. Docker takes the read-only image layers.
2. Docker adds a thin **writeable container layer** (the container layer) on top.
3. Any changes made while the container is running (writing new files, modifying code) are written only to this top writeable layer. The underlying image remains completely untouched.

This means you can start 10 separate containers from the exact same image, and they will all share the read-only image layers while keeping their own separate writeable states.

---

## Lab Tasks

### Task 1: Find container source image
1. Start the lab in your terminal:
   ```bash
   tld start dkr-find-container-source-image
   ```
2. A background container named `source-check-target` is currently running. Your goal is to find the exact image name (including tag, if specified) used to run this container.
3. Save the image name (e.g., `alpine:3.18.5`) to a file named `source_image.txt` inside a new directory named `docker-test` in your home directory (`~/docker-test/source_image.txt`).
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Identify image and container
1. Start the lab in your terminal:
   ```bash
   tld start dkr-identify-image-and-container
   ```
2. Your local Docker environment contains a `hello-world:latest` image and a stopped container named `ident-target-container`.
3. Locate the **IMAGE ID** of `hello-world:latest` and save it to a file named `image_id.txt` inside `~/docker-test/`.
4. Locate the **CONTAINER ID** of the stopped container named `ident-target-container` and save it to a file named `container_id.txt` inside `~/docker-test/`.
5. Verify the task:
   ```bash
   tld check
   ```
