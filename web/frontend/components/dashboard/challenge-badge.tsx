// web/frontend/components/dashboard/challenge-badge.tsx

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const topicColors: Record<string, { bg: string; border: string; color: string }> = {
  "docker":     { bg: "rgba(26,39,68,0.8)",  border: "#2d4a8a", color: "#7eb8ff" },
  "kubernetes": { bg: "rgba(30,21,53,0.8)",  border: "#4a2d8a", color: "#b87eff" },
  "linux":      { bg: "rgba(42,26,14,0.8)",  border: "#8a4a1a", color: "#ffaa5e" },
  "cicd":       { bg: "rgba(14,34,40,0.8)",  border: "#1a6a8a", color: "#5edfff" },
};

function getTopicFromId(id: string): string {
  if (id.includes("docker")) return "docker";
  if (id.includes("k8s") || id.includes("kube")) return "kubernetes";
  if (id.includes("linux")) return "linux";
  if (id.includes("ci") || id.includes("cd")) return "cicd";
  return "docker";
}

export function ChallengeBadge({ id }: { id: string }) {
  const topic = getTopicFromId(id);
  const colors = topicColors[topic];

  return (
    <Link href={`/challenges/${id}`}>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-primary)" }} />
        <span className="font-mono text-xs font-semibold" style={{ color: colors.color }}>{id}</span>
      </div>
    </Link>
  );
}