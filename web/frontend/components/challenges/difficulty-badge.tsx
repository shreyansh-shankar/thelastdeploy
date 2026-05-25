// web/frontend/components/challenges/difficulty-badge.tsx

import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/lib/types";

const config: Record<Difficulty, { label: string; style: React.CSSProperties; className: string }> = {
  beginner: {
    label: "Beginner",
    style: { backgroundColor: "rgba(var(--accent-primary-rgb), 0.15)", color: "var(--accent-primary)", borderColor: "rgba(var(--accent-primary-rgb), 0.3)" },
    className: "",
  },
  intermediate: {
    label: "Intermediate",
    style: { backgroundColor: "rgba(251,191,36,0.15)", color: "#fbbf24", borderColor: "rgba(251,191,36,0.3)" },
    className: "",
  },
  advanced: {
    label: "Advanced",
    style: { backgroundColor: "rgba(255,68,68,0.15)", color: "#ff4444", borderColor: "rgba(255,68,68,0.3)" },
    className: "",
  },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, style } = config[difficulty] ?? config.beginner;
  return (
    <Badge variant="outline" style={style} className="font-semibold text-xs px-2.5 py-0.5">
      {label}
    </Badge>
  );
}