import type { DocPage } from "../types";
const page: DocPage = {
  title: "Configuration Reference",
  description: "Full reference for the TLD CLI config file.",
  section: "Reference", sectionId: "reference",
  toc: [{ id: "schema", text: "Schema", level: 2 }],
  content: [
    { type: "heading2", text: "Schema", id: "schema" },
    { type: "table", headers: ["Key", "Type", "Default", "Description"], rows: [
      ["api_url", "string", "https://api.thelastdeploy.com", "Base URL of the TLD API"],
      ["auth_token", "string", "empty string", "JWT auth token — set by tld login"],
      ["lab_dir", "string", "~/.tld/labs", "Directory for local lab content"],
      ["theme", "string", "dark", "Terminal output theme: dark or light"],
      ["no_color", "bool", "false", "Disable ANSI color codes"],
      ["verbose", "bool", "false", "Enable verbose debug output"],
    ]},
  ],
};
export default page;
