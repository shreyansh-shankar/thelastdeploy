import type { DocPage } from "../types";
const page: DocPage = {
  title: "Sponsors",
  description: "Support the development of The Last Deploy.",
  section: "Community", sectionId: "community",
  toc: [{ id: "why-sponsor", text: "Why sponsor?", level: 2 }, { id: "how", text: "How to sponsor", level: 2 }],
  content: [
    { type: "heading2", text: "Why sponsor?", id: "why-sponsor" },
    { type: "paragraph", text: "TLD is built by a small team in their spare time. Sponsorships help cover infrastructure costs, fund new lab development, and allow us to dedicate more time to the platform." },
    { type: "paragraph", text: "Sponsors get: logo on the landing page and docs, a mention in the Discord and release notes, and early access to new tracks." },
    { type: "heading2", text: "How to sponsor", id: "how" },
    { type: "paragraph", text: "Open a GitHub issue titled 'Sponsorship inquiry' or email sponsor@thelastdeploy.com. We will get back to you within a few business days." },
    { type: "callout", variant: "tip", title: "Individual support", text: "Individuals can support TLD by starring the repository, contributing labs, and spreading the word. No money required." },
  ],
};
export default page;
