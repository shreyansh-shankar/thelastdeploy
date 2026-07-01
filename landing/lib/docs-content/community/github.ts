import type { DocPage } from "../types";
const page: DocPage = {
  title: "GitHub",
  description: "The TLD repository — issues, discussions, and contributions.",
  section: "Community", sectionId: "community",
  toc: [{ id: "repo", text: "Repository", level: 2 }, { id: "issues", text: "Issues", level: 2 }],
  content: [
    { type: "heading2", text: "Repository", id: "repo" },
    { type: "paragraph", text: "The entire TLD platform is open source and lives on GitHub." },
    { type: "code", lang: "text", code: "https://github.com/thelastdeploy/thelastdeploy" },
    { type: "callout", variant: "tip", title: "Star the repo", text: "Starring the repo helps more people find TLD and motivates us to keep building." },
    { type: "heading2", text: "Issues", id: "issues" },
    { type: "table", headers: ["Issue type", "When to use"], rows: [
      ["Bug report", "Something is broken — validator fails incorrectly, CLI crashes, etc."],
      ["Feature request", "You want something new — a lab idea, a CLI flag, a UI feature"],
      ["Lab request", "You want a specific lab written — describe the scenario you want"],
      ["Documentation", "Something in the docs is wrong or missing"],
    ]},
  ],
};
export default page;
