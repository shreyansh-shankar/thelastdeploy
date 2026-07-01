import type { DocPage } from "../types";

const page: DocPage = {
  title: "Labs Overview",
  description: "How TLD labs work — format, difficulty, scoring, and lifecycle.",
  section: "Labs",
  sectionId: "labs",
  toc: [
    { id: "what-is-a-lab", text: "What is a lab?", level: 2 },
    { id: "lab-format", text: "Lab format", level: 2 },
    { id: "difficulty", text: "Difficulty levels", level: 2 },
    { id: "scoring", text: "Scoring and XP", level: 2 },
    { id: "lifecycle", text: "Lab lifecycle", level: 2 },
  ],
  content: [
    {
      type: "heading2",
      text: "What is a lab?",
      id: "what-is-a-lab",
    },
    {
      type: "paragraph",
      text: "A TLD lab is a self-contained, broken infrastructure scenario with an automated validator. You receive a description of the problem, access to the broken environment, and a command to run when you think it's fixed.",
    },
    {
      type: "paragraph",
      text: "Labs are organized into tracks (Docker, Linux, Kubernetes, etc.) and sections within each track. Each section teaches a specific concept through a series of related labs.",
    },
    {
      type: "heading2",
      text: "Lab format",
      id: "lab-format",
    },
    {
      type: "paragraph",
      text: "Every lab on disk has the following structure:",
    },
    {
      type: "code",
      lang: "text",
      code: "labs/\n└── dkr-fix-broken-dockerfile/\n    ├── README.md      # Scenario, objective, hints\n    └── validator.sh   # Automated checker",
    },
    {
      type: "table",
      headers: ["File", "Purpose"],
      rows: [
        ["README.md", "The scenario the learner reads — objective, background, hints"],
        ["validator.sh", "Bash script that exits 0 on pass, non-zero on fail"],
      ],
    },
    {
      type: "heading2",
      text: "Difficulty levels",
      id: "difficulty",
    },
    {
      type: "table",
      headers: ["Level", "What to expect", "Time estimate"],
      rows: [
        ["Beginner", "Single concept, guided hints, clear error messages", "5–15 min"],
        ["Intermediate", "Multi-step fixes, less guidance, real-world scenarios", "15–45 min"],
        ["Advanced", "Production-grade incidents, multiple root causes, no hints", "45–120 min"],
        ["Expert", "SRE-level incidents, cascading failures, time pressure", "2–4 hours"],
      ],
    },
    {
      type: "heading2",
      text: "Scoring and XP",
      id: "scoring",
    },
    {
      type: "paragraph",
      text: "Each lab awards XP based on difficulty and whether you used hints.",
    },
    {
      type: "table",
      headers: ["Difficulty", "XP (no hints)", "XP (with hints)"],
      rows: [
        ["Beginner", "100 XP", "50 XP"],
        ["Intermediate", "250 XP", "125 XP"],
        ["Advanced", "500 XP", "300 XP"],
        ["Expert", "1000 XP", "600 XP"],
      ],
    },
    {
      type: "heading2",
      text: "Lab lifecycle",
      id: "lifecycle",
    },
    {
      type: "steps",
      steps: [
        { title: "Start", description: "tld lab start <lab-id> — pulls the Docker environment and prints the scenario." },
        { title: "Solve", description: "Investigate and fix the broken system using real tools in your terminal." },
        { title: "Validate", description: "tld check — runs the validator and reports which checks passed and which failed." },
        { title: "Repeat", description: "Fix remaining failures and re-run tld check as many times as needed." },
        { title: "Complete", description: "All checks pass — XP is awarded and the lab is marked complete in your history." },
        { title: "Cleanup", description: "tld lab stop removes all containers and volumes created by the lab." },
      ],
    },
  ],
};

export default page;
