# StatefulSets

While Deployments are ideal for stateless applications (where any replica pod is interchangeable), database and cluster stores (e.g. MySQL, PostgreSQL, Elasticsearch) require unique, persistent identities and stable network names.

Kubernetes provides **StatefulSets** to manage stateful workloads.

---

## Key StatefulSet Features

1. **Stable Network Identifiers**: Unlike Deployments where pods have randomized suffix hashes (e.g. `web-deploy-89cf-bc72`), StatefulSet pods are numbered sequentially from 0 (e.g. `web-0`, `web-1`, `web-2`).
2. **Stable Storage**: Each pod in a StatefulSet gets its own dedicated PersistentVolumeClaim. If a pod is rescheduled, it reconnects to the exact same PersistentVolume it was using before, preserving database state.
3. **Ordered Rollouts**: Updates or scaling are performed sequentially (e.g. scaling up starts `web-0` then waits for it to be ready before starting `web-1`).

---

## Headless Services

StatefulSets require a **Headless Service** to control the network domain of their Pods. A Service is headless if you set `spec.clusterIP: None` in its manifest.

Instead of load-balancing traffic across pods using a single ClusterIP, a Headless Service exposes direct DNS A records for each individual pod (e.g. `web-0.nginx-service.default.svc.cluster.local`), allowing pods to connect directly to each other for replication.
