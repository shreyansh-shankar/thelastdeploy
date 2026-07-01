import type { LabEntry } from "@/lib/docs-content/types";

const difficultyColors = {
  beginner: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", text: "#22c55e" },
  intermediate: { bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)", text: "#fbbf24" },
  advanced: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", text: "#ef4444" },
};

export default function LabCard({ lab }: { lab: LabEntry }) {
  const colors = difficultyColors[lab.difficulty];
  return (
    <div className="docs-lab-card">
      <div className="docs-lab-card-header">
        <div>
          <div className="docs-lab-card-id">{lab.id}</div>
          <h3 className="docs-lab-card-title">{lab.title}</h3>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: "999px",
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            color: colors.text,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {lab.difficulty}
        </span>
      </div>
      <p className="docs-lab-card-desc">{lab.description}</p>
      <div className="docs-lab-card-footer">
        <span
          style={{
            fontSize: "11px",
            color: "#3a3a5a",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {lab.timeEstimate}
        </span>
        <span style={{ fontSize: "11px", color: "#3a3a5a" }}>{lab.track}</span>
      </div>
    </div>
  );
}
