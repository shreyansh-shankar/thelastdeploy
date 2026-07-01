import type { DocPage } from "../types";
const page: DocPage = {
  title: "Development Setup",
  description: "Get your local environment ready to contribute to TLD.",
  section: "Contributing", sectionId: "contributing",
  toc: [
    { id: "prerequisites", text: "Prerequisites", level: 2 },
    { id: "clone", text: "Clone the repository", level: 2 },
    { id: "cli", text: "Build the CLI", level: 2 },
    { id: "backend", text: "Run the backend", level: 2 },
    { id: "frontend", text: "Run the frontend", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Prerequisites", id: "prerequisites" },
    { type: "table", headers: ["Tool", "Version"], rows: [
      ["Go", "1.21+"],
      ["Node.js", "18+"],
      ["Python", "3.11+"],
      ["Docker", "24+"],
    ]},
    { type: "heading2", text: "Clone the repository", id: "clone" },
    { type: "code", lang: "bash", code: "git clone https://github.com/thelastdeploy/thelastdeploy.git\ncd thelastdeploy" },
    { type: "heading2", text: "Build the CLI", id: "cli" },
    { type: "code", lang: "bash", code: "make build          # builds to ./bin/tld\nmake install        # builds + installs to /usr/local/bin\n./bin/tld version   # verify" },
    { type: "heading2", text: "Run the backend", id: "backend" },
    { type: "code", lang: "bash", code: "cd web/backend\npython -m venv venv && source venv/bin/activate\npip install -r requirements.txt\nuvicorn main:app --reload\n# API running at http://localhost:8000" },
    { type: "heading2", text: "Run the frontend", id: "frontend" },
    { type: "code", lang: "bash", code: "cd web/frontend\nnpm install && npm run dev\n# Dashboard running at http://localhost:3000\n\n# For the landing page and docs:\ncd landing\nnpm install && npm run dev\n# Landing at http://localhost:3002\n# Docs at http://localhost:3002/docs" },
  ],
};
export default page;
