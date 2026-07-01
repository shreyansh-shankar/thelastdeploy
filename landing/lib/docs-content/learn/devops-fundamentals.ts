import type { DocPage } from "../types";
const page: DocPage = {
  title: "DevOps Fundamentals",
  description: "What DevOps is, why it exists, and the core concepts you need to know.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "what-is-devops", text: "What is DevOps?", level: 2 },
    { id: "core-concepts", text: "Core concepts", level: 2 },
    { id: "toolchain", text: "The DevOps toolchain", level: 2 },
  ],
  content: [
    { type: "heading2", text: "What is DevOps?", id: "what-is-devops" },
    { type: "paragraph", text: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) with the goal of shortening the development lifecycle and delivering software continuously and reliably." },
    { type: "paragraph", text: "In practice, DevOps means: automating deployments, monitoring systems in production, treating infrastructure as code, and building a culture where developers are responsible for what they ship." },
    { type: "heading2", text: "Core concepts", id: "core-concepts" },
    { type: "table", headers: ["Concept", "What it means"], rows: [
      ["CI/CD", "Continuously integrate code changes and automatically deploy them"],
      ["Infrastructure as Code", "Define infrastructure in version-controlled files, not via GUIs"],
      ["Observability", "Know what your system is doing through logs, metrics, and traces"],
      ["Immutable infrastructure", "Never patch running servers — replace them"],
      ["Shift left", "Find problems earlier in the development cycle, not in production"],
    ]},
    { type: "heading2", text: "The DevOps toolchain", id: "toolchain" },
    { type: "table", headers: ["Stage", "Common tools"], rows: [
      ["Source control", "Git, GitHub, GitLab"],
      ["CI/CD", "GitHub Actions, GitLab CI, ArgoCD, Jenkins"],
      ["Containers", "Docker, containerd, Podman"],
      ["Orchestration", "Kubernetes, Nomad"],
      ["Infrastructure as Code", "Terraform, Pulumi, Ansible"],
      ["Monitoring", "Prometheus, Grafana, Datadog, New Relic"],
      ["Logging", "Loki, ELK stack, CloudWatch"],
    ]},
    { type: "callout", variant: "tip", title: "Start with TLD", text: "The best way to understand DevOps tools is to use them in anger. Start with the Docker track to build container intuition, then move to Kubernetes." },
  ],
};
export default page;
