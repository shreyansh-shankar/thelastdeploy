// web/frontend/components/challenges/challenge-card.tsx

import Link from "next/link";
import { DifficultyBadge } from "./difficulty-badge";
import { Challenge } from "@/lib/types";
import { CheckCircle2, Clock, Zap } from "lucide-react";

const topicConfig: Record<string, { bg: string; border: string; label: string; labelColor: string }> = {
  docker: {
    bg: "var(--topic-docker)",
    border: "var(--topic-docker-border)",
    label: "Docker",
    labelColor: "var(--topic-docker-text)",
  },
  kubernetes: {
    bg: "var(--topic-kubernetes)",
    border: "var(--topic-kubernetes-border)",
    label: "Kubernetes",
    labelColor: "var(--topic-kubernetes-text)",
  },
  linux: {
    bg: "var(--topic-linux)",
    border: "var(--topic-linux-border)",
    label: "Linux",
    labelColor: "var(--topic-linux-text)",
  },
  cicd: {
    bg: "var(--topic-cicd)",
    border: "var(--topic-cicd-border)",
    label: "CI/CD",
    labelColor: "var(--topic-cicd-text)",
  },
};

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const topic = topicConfig[challenge.topic] ?? topicConfig.docker;

  return (
    <Link href={`/challenges/${challenge.id}`} className="group block h-full">
      <div
        className="h-full rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl border"
        style={{
          backgroundColor: topic.bg,
          borderColor: topic.border,
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
            style={{
              color: topic.labelColor,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            {topic.label}
          </span>
          <div className="flex items-center gap-2">
            <DifficultyBadge difficulty={challenge.difficulty} />
            {challenge.completed && (
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-primary)" }} />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="font-bold text-base leading-snug text-white group-hover:text-[var(--accent-primary)] transition-colors">
            {challenge.title}
          </h3>
          <p className="mt-2 text-sm text-[#aaa] line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-[#888] pt-2 border-t border-white/10">
          <span className="flex items-center gap-1 font-mono font-semibold" style={{ color: "var(--accent-primary)" }}>
            <Zap className="h-3.5 w-3.5" />
            {challenge.xp} XP
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {challenge.estimated_minutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}