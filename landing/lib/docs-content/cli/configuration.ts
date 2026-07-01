import type { DocPage } from "../types";
const page: DocPage = {
  title: "Configuration",
  description: "The TLD CLI config file — location, format, and all options.",
  section: "CLI", sectionId: "cli",
  toc: [
    { id: "location", text: "Config file location", level: 2 },
    { id: "format", text: "Format", level: 2 },
    { id: "options", text: "Options", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Config file location", id: "location" },
    { type: "code", lang: "bash", code: "# Default location\n~/.tld/config.yaml\n\n# Override with env var\nTLD_CONFIG=/path/to/config.yaml tld lab list" },
    { type: "heading2", text: "Format", id: "format" },
    { type: "code", lang: "yaml", code: "# ~/.tld/config.yaml\napi_url: https://api.thelastdeploy.com\nauth_token: eyJhbGciOiJIUzI1NiJ9...\nlab_dir: ~/.tld/labs\ntheme: dark\nno_color: false\nverbose: false" },
    { type: "heading2", text: "Options", id: "options" },
    { type: "table", headers: ["Key", "Default", "Description"], rows: [
      ["api_url", "https://api.thelastdeploy.com", "API endpoint"],
      ["auth_token", "(empty)", "Authentication token — set by tld login"],
      ["lab_dir", "~/.tld/labs", "Where lab content is stored"],
      ["theme", "dark", "Terminal color theme (dark / light)"],
      ["no_color", "false", "Disable colored output"],
      ["verbose", "false", "Enable verbose output by default"],
    ]},
  ],
};
export default page;
