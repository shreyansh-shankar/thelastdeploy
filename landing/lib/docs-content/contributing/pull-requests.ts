import type { DocPage } from "../types";
const page: DocPage = {
  title: "Pull Requests",
  description: "How to open a PR, what to expect in review, and the merge process.",
  section: "Contributing", sectionId: "contributing",
  toc: [{ id: "process", text: "PR process", level: 2 }, { id: "checklist", text: "Checklist", level: 2 }],
  content: [
    { type: "heading2", text: "PR process", id: "process" },
    { type: "steps", steps: [
      { title: "Fork and branch", description: "Fork the repo. Create a branch: git checkout -b feat/your-feature-name" },
      { title: "Make your changes", description: "Keep PRs focused — one concern per PR. Small PRs get reviewed faster." },
      { title: "Test your changes", description: "Run validators, build the CLI, verify the UI. Include test steps in your PR description." },
      { title: "Open the PR", description: "Open against main. Include: what changed, why, how to test, and screenshots for UI changes." },
      { title: "Respond to review", description: "Maintainers will review within a few days. PRs with no response for 14 days may be closed." },
      { title: "Merge", description: "Once approved, a maintainer will squash-merge your PR." },
    ]},
    { type: "heading2", text: "Checklist", id: "checklist" },
    { type: "bullet-list", items: [
      "My branch is up to date with main",
      "I followed the commit convention",
      "I ran the linter for my language",
      "Validators pass for passing and failing states",
      "I included screenshots for UI changes",
      "The PR description explains what and why",
    ]},
  ],
};
export default page;
