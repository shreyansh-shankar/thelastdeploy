// web/frontend/components/dashboard/section-badge.tsx

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const topicColors: Record<string, { bg: string; border: string; color: string }> = {
  "docker":     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     color: "var(--topic-docker-text)" },
  "kubernetes": { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", color: "var(--topic-kubernetes-text)" },
  "linux":      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      color: "var(--topic-linux-text)" },
  "cicd":       { bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       color: "var(--topic-cicd-text)" },
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
  const colors = topicColors[topic] ?? topicColors.docker;
  const href = moduleId ? `/modules/${moduleId}` : "/modules";

  return (
    <Link href={href} className="cursor-pointer">
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent-primary)]" />
        <span className="font-mono text-xs font-semibold" style={{ color: colors.color }}>{sectionId}</span>
      </div>
    </Link>
  );
}