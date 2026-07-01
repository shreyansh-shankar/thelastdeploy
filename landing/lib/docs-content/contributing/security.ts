import type { DocPage } from "../types";
const page: DocPage = {
  title: "Security Policy",
  description: "How to responsibly disclose security vulnerabilities in TLD.",
  section: "Contributing", sectionId: "contributing",
  toc: [{ id: "reporting", text: "Reporting a vulnerability", level: 2 }, { id: "scope", text: "Scope", level: 2 }],
  content: [
    { type: "callout", variant: "danger", title: "Do not open public issues for security vulnerabilities", text: "If you discover a security vulnerability, do NOT open a public GitHub issue. Use the private disclosure process below." },
    { type: "heading2", text: "Reporting a vulnerability", id: "reporting" },
    { type: "paragraph", text: "Email security@thelastdeploy.com with:" },
    { type: "bullet-list", items: [
      "A description of the vulnerability",
      "Steps to reproduce",
      "Potential impact",
      "Any suggested remediation",
    ]},
    { type: "paragraph", text: "You will receive an acknowledgment within 48 hours. We aim to resolve critical vulnerabilities within 7 days." },
    { type: "heading2", text: "Scope", id: "scope" },
    { type: "table", headers: ["In scope", "Out of scope"], rows: [
      ["API authentication bypass", "Attacks on user-controlled lab environments"],
      ["Privilege escalation in the CLI", "Social engineering"],
      ["Data exposure in API responses", "Denial of service against public infra"],
    ]},
  ],
};
export default page;
