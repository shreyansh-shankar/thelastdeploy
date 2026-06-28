# Inspecting Pods

Once a Pod is running, you can inspect its IP address, query application logs, and execute commands inside its containers.

---

## 1. Finding Pod Details (IP & Node)

Using the `-o wide` flag, you can see the internal IP address assigned to the Pod and the worker node it has been scheduled to run on:
```bash
kubectl get pods -o wide
```

For more detailed low-level parameters, output the state in YAML:
```bash
kubectl get pod nginx-pod -o yaml
```

---

## 2. Querying Container Logs

If your application container outputs logs to standard output/error, you can retrieve them using:
```bash
kubectl logs nginx-pod
```

If the Pod runs multiple containers, you must specify the target container name using `-c`:
```bash
kubectl logs my-pod -c main-app
```

To stream the logs continuously:
```bash
kubectl logs -f nginx-pod
```

---

## 3. Executing Commands inside Containers

To troubleshoot an application or query local configs, you can run interactive bash sessions inside the container:
```bash
kubectl exec -it nginx-pod -- /bin/bash
```

Or execute a single command without opening an interactive shell:
```bash
kubectl exec nginx-pod -- ls -la /usr/share/nginx/html
```
