import type { DocPage } from "../types";
const page: DocPage = {
  title: "CI/CD Concepts",
  description: "Continuous integration, continuous delivery, and deployment pipeline fundamentals.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "what-is-cicd", text: "What is CI/CD?", level: 2 },
    { id: "pipeline-stages", text: "Pipeline stages", level: 2 },
    { id: "tools", text: "Common tools", level: 2 },
  ],
  content: [
    { type: "heading2", text: "What is CI/CD?", id: "what-is-cicd" },
    { type: "paragraph", text: "CI/CD is the practice of automating the building, testing, and deployment of software changes. It removes manual steps from the release process, making deployments faster and more reliable." },
    { type: "table", headers: ["Term", "What it means"], rows: [
      ["Continuous Integration (CI)", "Every code change is automatically built and tested"],
      ["Continuous Delivery (CD)", "Every passing build is automatically packaged and ready to deploy"],
      ["Continuous Deployment", "Every passing build is automatically deployed to production"],
    ]},
    { type: "heading2", text: "Pipeline stages", id: "pipeline-stages" },
    { type: "steps", steps: [
      { title: "Trigger", description: "A git push or PR triggers the pipeline." },
      { title: "Build", description: "Compile the code, build Docker images, resolve dependencies." },
      { title: "Test", description: "Run unit tests, integration tests, linters, security scans." },
      { title: "Package", description: "Create deployable artifacts — Docker images pushed to a registry." },
      { title: "Deploy", description: "Update the running service — rolling update, blue/green, canary." },
      { title: "Verify", description: "Smoke tests, health checks, automatic rollback on failure." },
    ]},
    { type: "heading2", text: "Common tools", id: "tools" },
    { type: "table", headers: ["Tool", "Type"], rows: [
      ["GitHub Actions", "CI/CD — native to GitHub, YAML-based"],
      ["GitLab CI/CD", "CI/CD — native to GitLab"],
      ["ArgoCD", "GitOps — syncs Kubernetes clusters from Git"],
      ["Jenkins", "CI/CD — self-hosted, plugin-based"],
      ["CircleCI", "Managed CI/CD"],
    ]},
  ],
};
export default page;
