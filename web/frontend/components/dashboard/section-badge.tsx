// web/frontend/components/dashboard/section-badge.tsx

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const topicColors: Record<string, { bg: string; border: string; color: string }> = {
  "docker":     { bg: "rgba(26,39,68,0.8)",  border: "#2d4a8a", color: "#7eb8ff" },
  "kubernetes": { bg: "rgba(30,21,53,0.8)",  border: "#4a2d8a", color: "#b87eff" },
  "linux":      { bg: "rgba(42,26,14,0.8)",  border: "#8a4a1a", color: "#ffaa5e" },
  "cicd":       { bg: "rgba(14,34,40,0.8)",  border: "#1a6a8a", color: "#5edfff" },
};

// section ids look like "what-is-docker", "run-first-container" etc.
function getTopicFromId(id: string): string {
  if (id.includes("docker") || id.includes("container")) return "docker";
  if (id.includes("k8s") || id.includes("kube") || id.includes("cluster")) return "kubernetes";
  if (id.includes("linux") || id.includes("shell") || id.includes("bash")) return "linux";
  if (id.includes("ci") || id.includes("cd") || id.includes("pipeline")) return "cicd";
  return "docker";
}

// We need moduleId to build the link — pass it as prop
export function SectionBadge({ sectionId, moduleId }: { sectionId: string; moduleId?: string }) {
  const topic = getTopicFromId(sectionId);
  const colors = topicColors[topic];
  const href = moduleId ? `/modules/${moduleId}` : "/modules";

  return (
    <Link href={href}>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-primary)" }} />
        <span className="font-mono text-xs font-semibold" style={{ color: colors.color }}>{sectionId}</span>
      </div>
    </Link>
  );
}