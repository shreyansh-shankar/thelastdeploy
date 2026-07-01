import type { DocPage } from "../types";
const page: DocPage = {
  title: "Authentication",
  description: "How TLD authentication works — tokens, offline mode, and troubleshooting.",
  section: "CLI", sectionId: "cli",
  toc: [
    { id: "login-flow", text: "Login flow", level: 2 },
    { id: "token-storage", text: "Token storage", level: 2 },
    { id: "offline", text: "Offline mode", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Login flow", id: "login-flow" },
    { type: "paragraph", text: "TLD uses OAuth 2.0 device flow for authentication. When you run `tld login`, the CLI opens your browser to complete authentication — no password is ever handled by the CLI itself." },
    { type: "code", lang: "bash", code: "tld login\n# Opening browser for authentication...\n# If browser does not open, visit:\n# https://auth.thelastdeploy.com/device?code=ABCD-1234\n#\n# Waiting for authentication...\n# Logged in as you@example.com" },
    { type: "heading2", text: "Token storage", id: "token-storage" },
    { type: "paragraph", text: "The auth token is stored in `~/.tld/config.yaml`. It is a signed JWT with an expiry. The CLI automatically refreshes the token when it expires." },
    { type: "callout", variant: "warning", title: "Keep your token private", text: "Never commit your config.yaml or share your auth token. Run `tld logout` to revoke and clear it." },
    { type: "heading2", text: "Offline mode", id: "offline" },
    { type: "paragraph", text: "Most lab operations work offline. You only need a network connection to: log in, sync lab content, and report completion. Running labs and validating solutions works entirely offline." },
  ],
};
export default page;
