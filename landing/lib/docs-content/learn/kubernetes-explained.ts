import type { DocPage } from "../types";
const page: DocPage = {
  title: "Kubernetes Explained",
  description: "Pods, nodes, services, and the Kubernetes control plane explained.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "what-is-k8s", text: "What is Kubernetes?", level: 2 },
    { id: "core-objects", text: "Core objects", level: 2 },
    { id: "architecture", text: "Architecture", level: 2 },
  ],
  content: [
    { type: "heading2", text: "What is Kubernetes?", id: "what-is-k8s" },
    { type: "paragraph", text: "Kubernetes (K8s) is an open-source container orchestration platform. It automates deploying, scaling, and managing containerized applications across clusters of machines." },
    { type: "paragraph", text: "If Docker answers 'how do I run a container?', Kubernetes answers 'how do I run 1000 containers reliably, across 50 servers, with automatic restarts, load balancing, and rolling updates?'" },
    { type: "heading2", text: "Core objects", id: "core-objects" },
    { type: "table", headers: ["Object", "What it is"], rows: [
      ["Pod", "The smallest deployable unit — one or more containers that share networking and storage"],
      ["Deployment", "Manages a set of identical Pods — handles rolling updates and restarts"],
      ["Service", "A stable network endpoint for a set of Pods — handles load balancing"],
      ["Ingress", "Routes external HTTP/HTTPS traffic to Services"],
      ["ConfigMap", "Stores non-secret configuration data"],
      ["Secret", "Stores sensitive configuration data (passwords, tokens)"],
      ["Namespace", "Virtual cluster within a cluster — for organizing resources"],
    ]},
    { type: "heading2", text: "Architecture", id: "architecture" },
    { type: "paragraph", text: "A Kubernetes cluster has two types of nodes: control plane nodes (which manage the cluster) and worker nodes (which run your workloads)." },
    { type: "callout", variant: "tip", title: "Practice with TLD", text: "The Kubernetes track starts with pod basics and progresses to debugging real cluster issues. Try k8s-fix-pod-crashloop to start." },
  ],
};
export default page;
