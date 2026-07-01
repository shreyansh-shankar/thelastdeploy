import type { DocPage } from "../types";

const page: DocPage = {
  title: "Why TLD Exists",
  description: "The gap in DevOps education — and why hands-on practice is the only answer.",
  section: "Introduction",
  sectionId: "introduction",
  toc: [
    { id: "the-problem", text: "The problem", level: 2 },
    { id: "the-gap", text: "The gap", level: 2 },
    { id: "the-solution", text: "The solution", level: 2 },
    { id: "why-not-existing-platforms", text: "Why not existing platforms?", level: 2 },
  ],
  content: [
    {
      type: "heading2",
      text: "The problem",
      id: "the-problem",
    },
    {
      type: "paragraph",
      text: "Every DevOps engineer remembers the gap — the painful distance between finishing a tutorial and actually knowing what you're doing. You watch a 4-hour Kubernetes course. You follow along. You copy the commands. And then you try to deploy something real, and nothing works.",
    },
    {
      type: "paragraph",
      text: "That gap exists because passive learning doesn't build the muscle memory that production work demands. Reading about a broken container is not the same as debugging one at 2am.",
    },
    {
      type: "heading2",
      text: "The gap",
      id: "the-gap",
    },
    {
      type: "paragraph",
      text: "Other disciplines have solved this problem.",
    },
    {
      type: "table",
      headers: ["Field", "Platform", "How they learn"],
      rows: [
        ["Cybersecurity", "TryHackMe / HackTheBox", "Hack real systems in isolated environments"],
        ["Programming", "LeetCode / Advent of Code", "Solve real algorithmic problems with test cases"],
        ["Linux", "OverTheWire", "Complete challenges by interacting with real servers"],
        ["DevOps", "???", "Watch YouTube. Copy commands. Hope it works."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "The DevOps gap",
      text: "There is no TryHackMe for DevOps. No platform that gives you a broken system and asks you to fix it — with real tools, in a real terminal, with automated validation. That's the gap TLD fills.",
    },
    {
      type: "heading2",
      text: "The solution",
      id: "the-solution",
    },
    {
      type: "paragraph",
      text: "The Last Deploy gives you deliberately broken infrastructure and asks you to fix it. Not in a fake browser terminal. Not with hints that give you the answer. On your own machine, using real tools, with an automated validator that tells you exactly what passed and what failed.",
    },
    {
      type: "paragraph",
      text: "You learn Docker not by watching someone run containers — but by fixing one that's networking incorrectly. You learn Kubernetes not by reading about pods — but by debugging one that won't schedule.",
    },
    {
      type: "heading2",
      text: "Why not existing platforms?",
      id: "why-not-existing-platforms",
    },
    {
      type: "table",
      headers: ["Platform", "Problem"],
      rows: [
        ["YouTube / Udemy", "Passive — you watch, not do"],
        ["KodeKloud", "Simulated environment, not your real machine"],
        ["Katacoda", "Shut down. Browser-based. No real debugging"],
        ["Cloud labs (AWS/GCP)", "Expensive. Requires account. Fake scenarios"],
        ["TLD", "Your machine. Real tools. Broken systems. Automated validation."],
      ],
    },
    {
      type: "paragraph",
      text: "TLD is the platform we wished existed when we were learning. So we built it.",
    },
  ],
};

export default page;
