import type { DocPage } from "../../types";
const page: DocPage = {
  title: "tld logout",
  description: "Reference for the tld logout command.",
  section: "CLI",
  sectionId: "cli",
  toc: [
    { id: "description", text: "Description", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
    { id: "examples", text: "Examples", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Description", id: "description" },
    { type: "paragraph", text: "The `tld logout` command." },
    { type: "heading2", text: "Usage", id: "usage" },
    { type: "code", lang: "bash", code: "tld logout [flags]" },
    { type: "heading2", text: "Examples", id: "examples" },
    { type: "code", lang: "bash", code: "tld logout" },
  ],
};
export default page;
