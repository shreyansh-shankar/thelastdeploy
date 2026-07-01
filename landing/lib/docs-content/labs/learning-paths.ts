import type { DocPage } from "../types";
const page: DocPage = {
  title: "Learning Paths",
  description: "Structured paths that guide you from beginner to expert in each technology.",
  section: "Labs", sectionId: "labs",
  toc: [
    { id: "what-is-a-path", text: "What is a learning path?", level: 2 },
    { id: "available-paths", text: "Available paths", level: 2 },
  ],
  content: [
    { type: "heading2", text: "What is a learning path?", id: "what-is-a-path" },
    { type: "paragraph", text: "A learning path is a curated sequence of labs that builds skills progressively. Each path covers a technology from fundamentals to production-grade scenarios." },
    { type: "heading2", text: "Available paths", id: "available-paths" },
    { type: "badge-list", items: [
      { label: "Docker — Fundamentals to Compose", badge: "Available", badgeVariant: "available" },
      { label: "Linux — Shell to SysAdmin", badge: "Available", badgeVariant: "available" },
      { label: "Kubernetes — Pods to Production", badge: "Available", badgeVariant: "available" },
      { label: "Git — Basics to Advanced Workflows", badge: "Available", badgeVariant: "available" },
      { label: "Terraform — IaC Fundamentals", badge: "Coming Soon", badgeVariant: "coming-soon" },
      { label: "CI/CD — GitHub Actions to GitOps", badge: "Coming Soon", badgeVariant: "coming-soon" },
    ]},
  ],
};
export default page;
