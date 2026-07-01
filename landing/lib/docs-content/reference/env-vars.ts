import type { DocPage } from "../types";
const page: DocPage = {
  title: "Environment Variables",
  description: "All environment variables recognized by the TLD CLI.",
  section: "Reference", sectionId: "reference",
  toc: [{ id: "vars", text: "Variables", level: 2 }],
  content: [
    { type: "heading2", text: "Variables", id: "vars" },
    { type: "table", headers: ["Variable", "Overrides", "Example"], rows: [
      ["TLD_CONFIG", "Config file path", "TLD_CONFIG=/etc/tld/config.yaml"],
      ["TLD_API_URL", "api_url in config", "TLD_API_URL=http://localhost:8000"],
      ["TLD_AUTH_TOKEN", "auth_token in config", "TLD_AUTH_TOKEN=eyJ..."],
      ["TLD_LAB_DIR", "lab_dir in config", "TLD_LAB_DIR=/data/labs"],
      ["TLD_NO_COLOR", "no_color in config", "TLD_NO_COLOR=1"],
      ["TLD_VERBOSE", "verbose in config", "TLD_VERBOSE=1"],
    ]},
    { type: "callout", variant: "tip", title: "CI usage", text: "Use environment variables instead of config files in CI pipelines. Set TLD_AUTH_TOKEN as a secret and TLD_NO_COLOR=1 for clean output." },
  ],
};
export default page;
