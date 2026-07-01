import type { DocPage } from "../types";
const page: DocPage = {
  title: "Roadmap",
  description: "What we are working on, what is next, and what is coming later.",
  section: "Community", sectionId: "community",
  toc: [
    { id: "current", text: "Current (v0.1)", level: 2 },
    { id: "next", text: "Next (v0.2)", level: 2 },
    { id: "future", text: "Future", level: 2 },
  ],
  content: [
    { type: "callout", variant: "info", title: "Transparency builds trust", text: "This roadmap is our honest plan, not a promise. Priorities can shift based on community feedback and contributors." },
    { type: "heading2", text: "Current (v0.1)", id: "current" },
    { type: "badge-list", items: [
      { label: "CLI — login, logout, lab start/stop, check, doctor, update, version", badge: "Done", badgeVariant: "available" },
      { label: "Labs — Linux, Git, Docker, Kubernetes tracks", badge: "Done", badgeVariant: "available" },
      { label: "Web dashboard — lab browser, progress tracking", badge: "Done", badgeVariant: "available" },
      { label: "Docs site — this page", badge: "Done", badgeVariant: "available" },
    ]},
    { type: "heading2", text: "Next (v0.2)", id: "next" },
    { type: "badge-list", items: [
      { label: "Nginx track — reverse proxy, load balancing, SSL labs", badge: "In Progress", badgeVariant: "beta" },
      { label: "Terraform track — IaC fundamentals", badge: "Planned", badgeVariant: "coming-soon" },
      { label: "Learning paths — guided track progression", badge: "Planned", badgeVariant: "coming-soon" },
      { label: "Leaderboard — top contributors and completions", badge: "Planned", badgeVariant: "coming-soon" },
    ]},
    { type: "heading2", text: "Future", id: "future" },
    { type: "badge-list", items: [
      { label: "CI/CD track — GitHub Actions, GitLab CI, ArgoCD", badge: "Future", badgeVariant: "coming-soon" },
      { label: "AWS track — IAM, VPC, ECS, S3 incident labs", badge: "Future", badgeVariant: "coming-soon" },
      { label: "Observability track — Prometheus, Grafana, Loki", badge: "Future", badgeVariant: "coming-soon" },
      { label: "Lab authoring UI — create labs without touching YAML", badge: "Future", badgeVariant: "coming-soon" },
      { label: "Team/org support — shared progress dashboards", badge: "Future", badgeVariant: "coming-soon" },
    ]},
  ],
};
export default page;
