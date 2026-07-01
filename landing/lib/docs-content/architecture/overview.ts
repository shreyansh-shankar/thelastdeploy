import type { DocPage } from "../types";

const page: DocPage = {
  title: "Architecture Overview",
  description: "How the TLD platform is built — from CLI to API to Docker to validator.",
  section: "Architecture",
  sectionId: "architecture",
  toc: [
    { id: "system-diagram", text: "System diagram", level: 2 },
    { id: "components", text: "Components", level: 2 },
    { id: "data-flow", text: "Data flow", level: 2 },
    { id: "tech-choices", text: "Technology choices", level: 2 },
  ],
  content: [
    {
      type: "heading2",
      text: "System diagram",
      id: "system-diagram",
    },
    {
      type: "arch-diagram",
      svg: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" width="100%" style="max-width:560px">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#22c55e" opacity="0.6"/>
    </marker>
  </defs>
  <!-- CLI -->
  <rect x="240" y="20" width="120" height="44" rx="8" fill="#0d1f0d" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="300" y="38" text-anchor="middle" fill="#22c55e" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">TLD CLI</text>
  <text x="300" y="54" text-anchor="middle" fill="#4a6a4a" font-size="9" font-family="JetBrains Mono,monospace">Go binary</text>
  <!-- Arrow CLI -> API -->
  <line x1="300" y1="64" x2="300" y2="100" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.3" marker-end="url(#arrow)"/>
  <text x="314" y="86" fill="#2a4a2a" font-size="9" font-family="JetBrains Mono,monospace">REST</text>
  <!-- API -->
  <rect x="200" y="100" width="200" height="44" rx="8" fill="#0d1a1f" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="300" y="118" text-anchor="middle" fill="#38bdf8" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">FastAPI Backend</text>
  <text x="300" y="134" text-anchor="middle" fill="#2a4a5a" font-size="9" font-family="JetBrains Mono,monospace">Python · REST API</text>
  <!-- Arrow API -> Worker -->
  <line x1="300" y1="144" x2="300" y2="180" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.3" marker-end="url(#arrow)"/>
  <!-- Worker -->
  <rect x="200" y="180" width="200" height="44" rx="8" fill="#1a0d1f" stroke="#a855f7" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="300" y="198" text-anchor="middle" fill="#a855f7" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">Lab Worker</text>
  <text x="300" y="214" text-anchor="middle" fill="#3a2a4a" font-size="9" font-family="JetBrains Mono,monospace">Orchestrates containers</text>
  <!-- Arrow Worker -> Docker -->
  <line x1="300" y1="224" x2="300" y2="260" stroke="#a855f7" stroke-width="1.5" stroke-opacity="0.3" marker-end="url(#arrow)"/>
  <!-- Docker -->
  <rect x="200" y="260" width="200" height="44" rx="8" fill="#0d1a1a" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="300" y="278" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">Docker Engine</text>
  <text x="300" y="294" text-anchor="middle" fill="#1a3a3a" font-size="9" font-family="JetBrains Mono,monospace">Runs lab containers</text>
  <!-- Database side -->
  <rect x="440" y="100" width="130" height="44" rx="8" fill="#1a1a0d" stroke="#fbbf24" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="505" y="118" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">PostgreSQL</text>
  <text x="505" y="134" text-anchor="middle" fill="#3a3a1a" font-size="9" font-family="JetBrains Mono,monospace">Users · Progress · Labs</text>
  <line x1="400" y1="122" x2="440" y2="122" stroke="#fbbf24" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="4,3"/>
  <!-- Frontend side -->
  <rect x="30" y="100" width="140" height="44" rx="8" fill="#1a0d1a" stroke="#f472b6" stroke-width="1.5" stroke-opacity="0.3"/>
  <text x="100" y="118" text-anchor="middle" fill="#f472b6" font-size="11" font-family="JetBrains Mono,monospace" font-weight="700">Next.js Frontend</text>
  <text x="100" y="134" text-anchor="middle" fill="#3a1a2a" font-size="9" font-family="JetBrains Mono,monospace">Web dashboard</text>
  <line x1="170" y1="122" x2="200" y2="122" stroke="#f472b6" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="4,3"/>
</svg>`,
    },
    {
      type: "heading2",
      text: "Components",
      id: "components",
    },
    {
      type: "table",
      headers: ["Component", "Language", "Role"],
      rows: [
        ["CLI (agent)", "Go", "User-facing tool — runs commands, manages labs, calls API"],
        ["Backend", "Python / FastAPI", "REST API — auth, progress, lab metadata, scoring"],
        ["Frontend", "Next.js / React", "Web dashboard — progress tracking, lab browser, profile"],
        ["Database", "PostgreSQL", "Persistent storage — users, XP, lab completion history"],
        ["Lab Engine", "Docker + Bash", "Spins up lab containers, runs validators"],
        ["Landing Page", "Next.js", "Marketing site — you're looking at the docs app inside this"],
      ],
    },
    {
      type: "heading2",
      text: "Data flow",
      id: "data-flow",
    },
    {
      type: "paragraph",
      text: "When you run `tld lab start docker-fundamentals`:",
    },
    {
      type: "steps",
      steps: [
        { title: "CLI authenticates", description: "The CLI reads your local token and sends a request to the API with the lab ID." },
        { title: "API validates", description: "The backend verifies the token, records that the lab was started, and returns lab metadata." },
        { title: "CLI pulls the lab", description: "The CLI git-pulls or downloads the lab content to ~/.tld/labs/." },
        { title: "Lab engine starts containers", description: "Docker Compose (or plain docker run) spins up the broken environment." },
        { title: "You work", description: "The lab environment is running. You investigate and fix." },
        { title: "Validator runs", description: "tld check executes validator.sh inside the lab environment and streams results to your terminal." },
        { title: "Results reported", description: "On pass, the CLI reports completion to the API. XP is awarded." },
      ],
    },
    {
      type: "heading2",
      text: "Technology choices",
      id: "tech-choices",
    },
    {
      type: "table",
      headers: ["Choice", "Why"],
      rows: [
        ["Go for the CLI", "Single static binary, fast startup, no runtime dependencies, great cross-platform support"],
        ["Python / FastAPI for the API", "Rapid development, excellent async support, strong typing with Pydantic"],
        ["Next.js for the frontend", "React server components, file-based routing, great DX"],
        ["PostgreSQL", "Reliable, battle-tested, excellent with complex queries for progress tracking"],
        ["Docker for labs", "Reproducible, isolated, runs anywhere, standard tooling"],
        ["Bash for validators", "Zero dependencies, universally available, testable with standard tools"],
      ],
    },
  ],
};

export default page;
