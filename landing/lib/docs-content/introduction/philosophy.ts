import type { DocPage } from "../types";

const page: DocPage = {
  title: "Philosophy",
  description: "The core principles that guide every decision at TLD.",
  section: "Introduction",
  sectionId: "introduction",
  toc: [
    { id: "learn-by-breaking", text: "Learn by breaking", level: 2 },
    { id: "infrastructure-is-disposable", text: "Infrastructure is disposable", level: 2 },
    { id: "read-the-docs", text: "Read the docs", level: 2 },
    { id: "automate-everything", text: "Automate everything", level: 2 },
    { id: "no-vendor-lock-in", text: "No vendor lock-in", level: 2 },
    { id: "understand-before-copying", text: "Understand before copying", level: 2 },
  ],
  content: [
    {
      type: "paragraph",
      text: "These principles aren't just words on a page. They shaped how TLD labs are written, how validators work, and how we think about the right way to teach infrastructure.",
    },
    {
      type: "heading2",
      text: "Learn by breaking",
      id: "learn-by-breaking",
    },
    {
      type: "paragraph",
      text: "The best way to understand a system is to watch it fail. TLD gives you deliberately broken environments so that the act of debugging teaches you the internals — not a lecture about them.",
    },
    {
      type: "paragraph",
      text: "When you spend 20 minutes tracking down why a container can't reach the internet and discover it's because the bridge network was misconfigured, you'll never forget how Docker networking works. That's the point.",
    },
    {
      type: "heading2",
      text: "Infrastructure is disposable",
      id: "infrastructure-is-disposable",
    },
    {
      type: "paragraph",
      text: "Every TLD lab is ephemeral. You spin it up, you break things, you fix them, and you tear it down. There is no persistent state to protect. This removes the fear of experimentation — the biggest obstacle to learning infrastructure.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Delete freely",
      text: "Blew up the whole lab environment? Run tld lab start again. It takes seconds. Infrastructure as code means infrastructure is reproducible.",
    },
    {
      type: "heading2",
      text: "Read the docs",
      id: "read-the-docs",
    },
    {
      type: "paragraph",
      text: "TLD labs don't give you the answer. They give you the tools, the environment, and enough context to figure it out yourself — the same way a real on-call incident works. You're expected to read man pages, official documentation, and error messages.",
    },
    {
      type: "paragraph",
      text: "Validators check the outcome, not the method. How you get there is up to you.",
    },
    {
      type: "heading2",
      text: "Automate everything",
      id: "automate-everything",
    },
    {
      type: "paragraph",
      text: "Manual verification is unreliable. Every TLD lab has an automated validator — a shell script that checks your solution against the expected state. No human needs to review your work. The validator is the judge.",
    },
    {
      type: "paragraph",
      text: "This also means the platform scales. Anyone can write a lab with a validator and contribute it. The system handles the rest.",
    },
    {
      type: "heading2",
      text: "No vendor lock-in",
      id: "no-vendor-lock-in",
    },
    {
      type: "paragraph",
      text: "TLD runs on your machine using open-source tools. Docker, bash, Go — tools you'll use regardless of which cloud provider or employer you work with. We deliberately avoid proprietary platforms, managed services, or tools that require an account.",
    },
    {
      type: "heading2",
      text: "Understand before copying",
      id: "understand-before-copying",
    },
    {
      type: "paragraph",
      text: "Copying commands from Stack Overflow works exactly once. TLD labs are designed to force understanding — you can't just paste your way to a passing validator. You need to know why the fix works.",
    },
    {
      type: "paragraph",
      text: "Hints are available for when you're stuck, but they lead you in the right direction — they don't hand you the answer.",
    },
  ],
};

export default page;
