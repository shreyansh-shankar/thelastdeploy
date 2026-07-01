import type { DocPage } from "../types";
const page: DocPage = {
  title: "Glossary",
  description: "Key terms used throughout the TLD platform.",
  section: "Reference", sectionId: "reference",
  toc: [{ id: "terms", text: "Terms", level: 2 }],
  content: [
    { type: "heading2", text: "Terms", id: "terms" },
    { type: "table", headers: ["Term", "Definition"], rows: [
      ["Lab", "A self-contained, broken infrastructure scenario with an automated validator"],
      ["Track", "A collection of labs organized around a technology (Docker, Kubernetes, etc.)"],
      ["Section", "A subset of labs within a track that covers a specific concept"],
      ["Validator", "A bash script (validator.sh) that checks whether your solution is correct"],
      ["XP", "Experience points awarded for completing labs"],
      ["tld check", "The CLI command that runs the validator for the current lab"],
      ["Lab Engine", "The TLD component that spins up Docker environments for labs"],
      ["Agent", "The TLD CLI binary (stored in the agent/ directory)"],
    ]},
  ],
};
export default page;
