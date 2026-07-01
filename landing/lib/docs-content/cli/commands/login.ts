import type { DocPage } from "../../types";
const page: DocPage = {
  title: "tld login",
  description: "Reference for the tld login command.",
  section: "CLI",
  sectionId: "cli",
  toc: [
    { id: "description", text: "Description", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
    { id: "examples", text: "Examples", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Description", id: "description" },
    { type: "paragraph", text: "The `tld login` command." },
    { type: "heading2", text: "Usage", id: "usage" },
    { type: "code", lang: "bash", code: "tld login [flags]" },
    { type: "heading2", text: "Examples", id: "examples" },
    { type: "code", lang: "bash", code: "tld login" },
  ],
};
export default page;
