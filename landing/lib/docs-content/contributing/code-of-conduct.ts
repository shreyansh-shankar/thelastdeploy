import type { DocPage } from "../types";
const page: DocPage = {
  title: "Code of Conduct",
  description: "Community standards for The Last Deploy.",
  section: "Contributing", sectionId: "contributing",
  toc: [{ id: "pledge", text: "Our pledge", level: 2 }, { id: "standards", text: "Standards", level: 2 }, { id: "enforcement", text: "Enforcement", level: 2 }],
  content: [
    { type: "heading2", text: "Our pledge", id: "pledge" },
    { type: "paragraph", text: "We pledge to make participation in the TLD community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity, level of experience, education, nationality, personal appearance, race, religion, or sexual identity and orientation." },
    { type: "heading2", text: "Standards", id: "standards" },
    { type: "paragraph", text: "Examples of behavior that contributes to a positive environment:" },
    { type: "bullet-list", items: [
      "Using welcoming and inclusive language",
      "Being respectful of differing viewpoints and experiences",
      "Gracefully accepting constructive criticism",
      "Focusing on what is best for the community",
      "Showing empathy towards other community members",
    ]},
    { type: "paragraph", text: "Examples of unacceptable behavior:" },
    { type: "bullet-list", items: [
      "Trolling, insulting/derogatory comments, and personal or political attacks",
      "Public or private harassment",
      "Publishing others private information without explicit permission",
      "Other conduct which could reasonably be considered inappropriate",
    ]},
    { type: "heading2", text: "Enforcement", id: "enforcement" },
    { type: "paragraph", text: "Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated and will result in a response deemed necessary and appropriate. See the full CODE_OF_CONDUCT.md in the repository for details." },
  ],
};
export default page;
