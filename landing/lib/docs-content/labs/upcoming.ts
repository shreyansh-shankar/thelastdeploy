import type { DocPage } from "../types";
const page: DocPage = {
  title: "Upcoming Labs",
  description: "What we are building next.",
  section: "Labs", sectionId: "labs",
  toc: [{ id: "roadmap", text: "Roadmap", level: 2 }],
  content: [
    { type: "heading2", text: "Roadmap", id: "roadmap" },
    { type: "badge-list", items: [
      { label: "Nginx — Reverse Proxy Configuration", badge: "In Progress", badgeVariant: "beta" },
      { label: "Terraform — State File Corruption Recovery", badge: "Planned", badgeVariant: "coming-soon" },
      { label: "Prometheus — Alertmanager Misconfiguration", badge: "Planned", badgeVariant: "coming-soon" },
      { label: "CI/CD — Broken GitHub Actions Pipeline", badge: "Planned", badgeVariant: "coming-soon" },
      { label: "AWS — IAM Permission Debugging", badge: "Future", badgeVariant: "coming-soon" },
      { label: "Kubernetes — RBAC Lockout Recovery", badge: "Future", badgeVariant: "coming-soon" },
    ]},
    { type: "callout", variant: "tip", title: "Suggest a lab", text: "Have an idea for a lab? Open a GitHub issue with the label 'lab-request'. Labs suggested by the community get built first." },
  ],
};
export default page;
