import type { DocPage } from "../types";
const page: DocPage = {
  title: "Good First Issues",
  description: "The best ways to make your first contribution to TLD.",
  section: "Contributing", sectionId: "contributing",
  toc: [{ id: "types", text: "Types of contributions", level: 2 }, { id: "labels", text: "GitHub labels", level: 2 }],
  content: [
    { type: "heading2", text: "Types of contributions", id: "types" },
    { type: "table", headers: ["Type", "Examples", "Difficulty"], rows: [
      ["Fix a typo", "README, lab content.md, doc pages", "Very easy"],
      ["Improve a lab README", "Add more context, clearer hints", "Easy"],
      ["Fix a validator bug", "Edge case in validator.sh", "Easy–Medium"],
      ["Write a new beginner lab", "New track concept, guided hints", "Medium"],
      ["Improve error messages", "CLI error output clarity", "Medium"],
      ["Add a new CLI command", "New flag, new subcommand", "Hard"],
    ]},
    { type: "heading2", text: "GitHub labels", id: "labels" },
    { type: "badge-list", items: [
      { label: "good first issue — safe for first contributors", badge: "Start Here", badgeVariant: "available" },
      { label: "help wanted — maintainers need assistance", badge: "Help Wanted", badgeVariant: "beta" },
      { label: "lab-request — community lab ideas", badge: "Labs", badgeVariant: "new" },
      { label: "bug — something is broken", badge: "Bug", badgeVariant: "coming-soon" },
    ]},
    { type: "callout", variant: "tip", title: "Ask before you build", text: "For anything bigger than a typo fix, open a GitHub issue first and describe what you plan to do. This prevents duplicate work and ensures your contribution fits the project direction." },
  ],
};
export default page;
