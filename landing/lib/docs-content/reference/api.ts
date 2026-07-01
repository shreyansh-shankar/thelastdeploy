import type { DocPage } from "../types";
const page: DocPage = {
  title: "API Reference",
  description: "REST API endpoints for the TLD backend.",
  section: "Reference", sectionId: "reference",
  toc: [{ id: "auth", text: "Authentication", level: 2 }, { id: "endpoints", text: "Endpoints", level: 2 }],
  content: [
    { type: "callout", variant: "warning", title: "Pre-stable API", text: "The TLD REST API is pre-stable. Endpoints may change between minor versions until v1.0.0." },
    { type: "heading2", text: "Authentication", id: "auth" },
    { type: "paragraph", text: "All API requests require a Bearer token in the Authorization header." },
    { type: "code", lang: "bash", code: "curl https://api.thelastdeploy.com/v1/labs \
  -H 'Authorization: Bearer <your-token>'" },
    { type: "heading2", text: "Endpoints", id: "endpoints" },
    { type: "table", headers: ["Method", "Endpoint", "Description"], rows: [
      ["GET", "/v1/health", "Health check — no auth required"],
      ["POST", "/v1/auth/login", "Exchange OAuth code for token"],
      ["POST", "/v1/auth/logout", "Revoke current token"],
      ["GET", "/v1/labs", "List all available labs"],
      ["GET", "/v1/labs/:id", "Get lab metadata"],
      ["POST", "/v1/progress/start", "Record lab start"],
      ["POST", "/v1/progress/complete", "Record lab completion and award XP"],
      ["GET", "/v1/profile", "Get current user profile and XP"],
    ]},
  ],
};
export default page;
