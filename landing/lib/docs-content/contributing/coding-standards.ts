import type { DocPage } from "../types";
const page: DocPage = {
  title: "Coding Standards",
  description: "Commit conventions, code style, and PR checklist.",
  section: "Contributing", sectionId: "contributing",
  toc: [{ id: "commits", text: "Commit convention", level: 2 }, { id: "code-style", text: "Code style", level: 2 }],
  content: [
    { type: "heading2", text: "Commit convention", id: "commits" },
    { type: "paragraph", text: "TLD follows Conventional Commits. Every commit message must follow this format:" },
    { type: "code", lang: "text", code: "<type>(<scope>): <short description>\n\n[optional body]\n\nExamples:\nfeat(challenges): add dkr-fix-broken-container-network lab\nfix(validator): correct nginx port check in linux-networking\ndocs: update contributing guide\nchore(deps): bump next to 16.2.6" },
    { type: "table", headers: ["Type", "When to use"], rows: [
      ["feat", "New lab, new feature, new validator"],
      ["fix", "Bug fix in validator, CLI, or UI"],
      ["docs", "Documentation only changes"],
      ["chore", "Build scripts, deps, CI"],
      ["refactor", "Code change with no behavior change"],
      ["style", "Formatting, CSS, whitespace"],
      ["test", "Adding or improving tests"],
    ]},
    { type: "heading2", text: "Code style", id: "code-style" },
    { type: "table", headers: ["Area", "Standard"], rows: [
      ["Go (CLI)", "gofmt + golint — run `make lint` before committing"],
      ["Python (API)", "black + ruff — run `ruff check .` before committing"],
      ["TypeScript (frontend)", "ESLint + Prettier — run `npm run lint` before committing"],
      ["Bash (validators)", "shellcheck — all validators must pass shellcheck"],
    ]},
  ],
};
export default page;
