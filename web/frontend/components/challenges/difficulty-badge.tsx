// web/frontend/components/challenges/difficulty-badge.tsx

import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/lib/types";

const config: Record<Difficulty, { label: string; className: string }> = {
  beginner: {
    label: "Beginner",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  },
  intermediate: {
    label: "Intermediate",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
  },
  advanced: {
    label: "Advanced",
    className: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
  },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty] ?? config.beginner;
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}