import type { DocPage } from "../types";
const page: DocPage = {
  title: "CLI Overview",
  description: "The tld command-line interface — installation, global options, and commands.",
  section: "CLI",
  sectionId: "cli",
  toc: [
    { id: "about", text: "About the CLI", level: 2 },
    { id: "global-flags", text: "Global flags", level: 2 },
    { id: "commands", text: "Commands", level: 2 },
  ],
  content: [
    { type: "heading2", text: "About the CLI", id: "about" },
    { type: "paragraph", text: "The TLD CLI (called `tld`) is the primary interface to the platform. It's a single static binary written in Go — no runtime required. You use it to authenticate, manage labs, validate solutions, and configure your environment." },
    { type: "code", lang: "bash", code: "tld --help\n\nUsage:\n  tld [command]\n\nAvailable Commands:\n  login     Authenticate with The Last Deploy\n  logout    Sign out\n  lab       Manage labs (start, stop, list, check)\n  check     Validate your current lab solution\n  doctor    Diagnose your environment\n  update    Update the CLI to the latest version\n  version   Show version information\n  config    Manage CLI configuration\n\nFlags:\n  -h, --help      Show help\n  -v, --verbose   Enable verbose output\n      --no-color  Disable colored output\n      --json      Output as JSON (for scripting)" },
    { type: "heading2", text: "Global flags", id: "global-flags" },
    { type: "table", headers: ["Flag", "Description"], rows: [
      ["--help, -h", "Show help for any command"],
      ["--verbose, -v", "Enable verbose output including debug information"],
      ["--no-color", "Disable ANSI color codes (useful in CI environments)"],
      ["--json", "Output results as JSON for scripting"],
      ["--profile <name>", "Use a named config profile"],
    ]},
    { type: "heading2", text: "Commands", id: "commands" },
    { type: "table", headers: ["Command", "Description"], rows: [
      ["tld login", "Authenticate with your TLD account"],
      ["tld logout", "Sign out and clear local credentials"],
      ["tld lab list", "List available labs"],
      ["tld lab start <id>", "Start a lab environment"],
      ["tld lab stop", "Stop the current lab"],
      ["tld check", "Validate your current lab solution"],
      ["tld doctor", "Diagnose your environment"],
      ["tld update", "Update the CLI"],
      ["tld version", "Show version info"],
      ["tld config get/set", "Read or write config values"],
    ]},
  ],
};
export default page;
