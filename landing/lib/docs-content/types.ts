// ─── Content Block Types ─────────────────────────────────────────────────────

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string; id: string }
  | { type: "heading3"; text: string; id: string }
  | { type: "heading4"; text: string; id: string }
  | { type: "code"; lang: string; code: string }
  | { type: "callout"; variant: "info" | "warning" | "danger" | "tip"; title: string; text: string }
  | { type: "steps"; steps: { title: string; description: string; code?: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "collapsible"; trigger: string; content: string; code?: string }
  | { type: "lab-list"; labs: LabEntry[] }
  | { type: "command-card"; command: string; description: string; args?: { name: string; desc: string; required?: boolean }[]; options?: { flag: string; desc: string }[]; examples: { desc: string; cmd: string }[] }
  | { type: "arch-diagram"; svg: string }
  | { type: "divider" }
  | { type: "bullet-list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "grid"; columns: { title: string; items: string[] }[] }
  | { type: "badge-list"; items: { label: string; badge: string; badgeVariant: "available" | "coming-soon" | "beta" | "new" }[] };

export interface LabEntry {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  track: string;
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface DocPage {
  title: string;
  description: string;
  section: string;
  sectionId: string;
  toc: TocEntry[];
  content: ContentBlock[];
}
