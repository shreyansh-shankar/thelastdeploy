import type { DocPage } from "../types";
const page: DocPage = {
  title: "Advanced Labs",
  description: "Production-grade incidents with no hints. Expert debugging required.",
  section: "Labs", sectionId: "labs",
  toc: [{ id: "labs", text: "Labs", level: 2 }],
  content: [
    { type: "callout", variant: "warning", title: "No hints mode", text: "Advanced labs do not provide hints. You are expected to read man pages, official docs, and error messages to solve them." },
    { type: "heading2", text: "Labs", id: "labs" },
    { type: "lab-list", labs: [
      { id: "dkr-multi-stage-incident", title: "Multi-Stage Build Incident", description: "A production Docker image increased in size by 800MB overnight. Find the cause and fix the Dockerfile.", difficulty: "advanced", timeEstimate: "60 min", track: "Docker" },
      { id: "k8s-node-pressure", title: "Node Pressure Eviction", description: "Pods are being evicted and the cluster is degraded. Diagnose the resource pressure and fix it.", difficulty: "advanced", timeEstimate: "90 min", track: "Kubernetes" },
      { id: "lnx-disk-full", title: "Disk Full — Production System", description: "A production server has run out of disk space. Services are failing. Find what consumed the disk and recover without data loss.", difficulty: "advanced", timeEstimate: "45 min", track: "Linux" },
    ]},
  ],
};
export default page;
