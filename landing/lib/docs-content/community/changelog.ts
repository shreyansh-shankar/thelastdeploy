import type { DocPage } from "../types";
const page: DocPage = {
  title: "Changelog",
  description: "A history of TLD releases.",
  section: "Community", sectionId: "community",
  toc: [{ id: "v0-1", text: "v0.1.0", level: 2 }],
  content: [
    { type: "heading2", text: "v0.1.0 — Initial Release", id: "v0-1" },
    { type: "paragraph", text: "The first public release of The Last Deploy." },
    { type: "bullet-list", items: [
      "**CLI** — login, logout, lab start/stop/list, check, doctor, update, version, config commands",
      "**Labs** — Linux Fundamentals, Linux Users & Permissions, Linux Processes & Services, Linux Networking",
      "**Labs** — Git Fundamentals",
      "**Labs** — Docker Fundamentals, Docker Containers, Docker Images, Docker Networking, Docker Storage, Docker Compose, Docker Troubleshooting",
      "**Labs** — Kubernetes Fundamentals, Kubernetes Pods, Kubernetes Workloads, Kubernetes Config & Storage, Kubernetes Troubleshooting",
      "**Web Dashboard** — lab browser, progress tracking, XP system",
      "**Landing page** — thelastdeploy.com",
      "**Docs** — this documentation site",
    ]},
    { type: "callout", variant: "info", title: "Pre-launch", text: "v0.1.0 is a pre-launch release. APIs and lab formats may change. We will follow semantic versioning from v1.0.0 onwards." },
  ],
};
export default page;
