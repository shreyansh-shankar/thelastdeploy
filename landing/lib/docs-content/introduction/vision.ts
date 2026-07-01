import type { DocPage } from "../types";

const page: DocPage = {
  title: "Vision",
  description: "Where The Last Deploy is going — and why it matters.",
  section: "Introduction",
  sectionId: "introduction",
  toc: [
    { id: "long-term-vision", text: "Long-term vision", level: 2 },
    { id: "pillars", text: "The pillars", level: 2 },
    { id: "for-contributors", text: "For contributors", level: 2 },
  ],
  content: [
    {
      type: "paragraph",
      text: "The long-term vision for The Last Deploy is to become the definitive hands-on learning platform for infrastructure engineering — the place every DevOps engineer, SRE, and platform engineer goes to sharpen their skills.",
    },
    {
      type: "heading2",
      text: "Long-term vision",
      id: "long-term-vision",
    },
    {
      type: "paragraph",
      text: "We want a world where a junior engineer can go from 'I just learned what Docker is' to 'I can debug a production container incident' without spending money, watching videos, or guessing their way through tutorials.",
    },
    {
      type: "quote",
      text: "The best way to learn infrastructure is to be responsible for it. TLD makes that possible without the 3am pages.",
    },
    {
      type: "heading2",
      text: "The pillars",
      id: "pillars",
    },
    {
      type: "grid",
      columns: [
        {
          title: "Open Source",
          items: [
            "Apache 2.0 licensed",
            "Every lab is public",
            "Every validator is auditable",
            "No hidden proprietary engine",
          ],
        },
        {
          title: "Community-Driven",
          items: [
            "Labs written by practitioners",
            "Validators reviewed by the community",
            "Roadmap shaped by users",
            "Discord-first support",
          ],
        },
        {
          title: "Practical First",
          items: [
            "No theory without practice",
            "Real tools, real terminals",
            "Production scenarios only",
            "Automated, honest grading",
          ],
        },
        {
          title: "Forever Free",
          items: [
            "No paywalls",
            "No subscriptions",
            "No cloud fees",
            "No account required to start",
          ],
        },
      ],
    },
    {
      type: "heading2",
      text: "For contributors",
      id: "for-contributors",
    },
    {
      type: "paragraph",
      text: "If you're considering contributing to TLD, know that you're not just adding a feature — you're helping build the resource that every DevOps learner deserves. The platform grows with every new lab, every fixed validator, and every bug report.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Contribute to the vision",
      text: "The best way to move the vision forward is to write a lab for something you struggled to learn. Your hard-won knowledge is exactly what the next engineer needs.",
    },
  ],
};

export default page;
