import type { DocPage } from "../types";
const page: DocPage = {
  title: "Intermediate Labs",
  description: "Multi-step challenges with less guidance and real-world scenarios.",
  section: "Labs", sectionId: "labs",
  toc: [{ id: "labs", text: "Labs", level: 2 }],
  content: [
    { type: "heading2", text: "Labs", id: "labs" },
    { type: "lab-list", labs: [
      { id: "dkr-container-networking", title: "Fix Container Networking", description: "Two containers can not communicate. Fix the network configuration so they can.", difficulty: "intermediate", timeEstimate: "25 min", track: "Docker" },
      { id: "dkr-compose-healthcheck", title: "Compose Service Dependencies", description: "A Docker Compose app starts in the wrong order. Fix the healthcheck and dependency config.", difficulty: "intermediate", timeEstimate: "30 min", track: "Docker" },
      { id: "lnx-process-management", title: "Rogue Process Investigation", description: "A process is consuming all CPU. Identify it, understand why, and handle it correctly.", difficulty: "intermediate", timeEstimate: "20 min", track: "Linux" },
      { id: "k8s-service-unreachable", title: "Service Unreachable", description: "A Kubernetes Service is not routing traffic. Fix the selector and port configuration.", difficulty: "intermediate", timeEstimate: "35 min", track: "Kubernetes" },
      { id: "git-merge-conflict", title: "Resolve a Merge Conflict", description: "A merge conflict was left unresolved in the repository. Fix it without losing any changes.", difficulty: "intermediate", timeEstimate: "20 min", track: "Git" },
    ]},
  ],
};
export default page;
