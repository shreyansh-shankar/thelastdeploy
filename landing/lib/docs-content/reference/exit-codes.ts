import type { DocPage } from "../types";
const page: DocPage = {
  title: "Exit Codes",
  description: "TLD CLI exit codes — for scripting and CI integration.",
  section: "Reference", sectionId: "reference",
  toc: [{ id: "codes", text: "Exit codes", level: 2 }],
  content: [
    { type: "heading2", text: "Exit codes", id: "codes" },
    { type: "table", headers: ["Code", "Meaning"], rows: [
      ["0", "Success"],
      ["1", "General error (invalid args, config error, etc.)"],
      ["2", "Docker not running or not accessible"],
      ["3", "Authentication required — run tld login"],
      ["4", "Lab not found"],
      ["5", "Validator failed — one or more checks did not pass"],
      ["10", "Network error — could not reach the API"],
    ]},
  ],
};
export default page;
