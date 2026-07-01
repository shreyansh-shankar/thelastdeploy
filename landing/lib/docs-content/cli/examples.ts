import type { DocPage } from "../types";
const page: DocPage = {
  title: "Examples",
  description: "Real-world TLD CLI usage patterns.",
  section: "CLI", sectionId: "cli",
  toc: [
    { id: "daily-workflow", text: "Daily workflow", level: 2 },
    { id: "scripting", text: "Scripting with --json", level: 2 },
    { id: "ci-usage", text: "Usage in CI", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Daily workflow", id: "daily-workflow" },
    { type: "code", lang: "bash", code: "# Start your session\ntld doctor              # verify environment\ntld lab list --track docker\n\n# Pick a lab and work on it\ntld lab start dkr-container-networking\n# ... investigate and fix ...\ntld check               # validate your fix\n\n# Clean up\ntld lab stop" },
    { type: "heading2", text: "Scripting with --json", id: "scripting" },
    { type: "code", lang: "bash", code: "# Get lab list as JSON\ntld lab list --json | jq '.[] | select(.difficulty == \"beginner\")'\n\n# Get check results as JSON\ntld check --json | jq '.checks[] | select(.passed == false)'" },
    { type: "heading2", text: "Usage in CI", id: "ci-usage" },
    { type: "code", lang: "yaml", code: "# Example GitHub Actions step\n- name: Validate TLD lab\n  run: |\n    tld check --json --no-color\n  env:\n    TLD_AUTH_TOKEN: ${{ secrets.TLD_TOKEN }}" },
  ],
};
export default page;
