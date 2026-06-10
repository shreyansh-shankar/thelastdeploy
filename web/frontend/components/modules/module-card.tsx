// web/frontend/components/modules/module-card.tsx

import Link from "next/link";
import { Module } from "@/lib/types";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import { Clock, Zap, ChevronRight, CheckCircle2 } from "lucide-react";

const topicConfig: Record<string, { bg: string; border: string; label: string; color: string }> = {
  docker:     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     label: "Docker",     color: "var(--topic-docker-text)" },
  kubernetes: { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", label: "Kubernetes", color: "var(--topic-kubernetes-text)" },
  linux:      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      label: "Linux",      color: "var(--topic-linux-text)" },
  cicd:       { bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       label: "CI/CD",      color: "var(--topic-cicd-text)" },
};

export function ModuleCard({ module }: { module: Module }) {
  const topic = topicConfig[module.topic] ?? topicConfig.docker;
  const progressPct = module.total_sections > 0
    ? Math.round((module.completed_sections / module.total_sections) * 100)
    : 0;
  const isCompleted = module.completed_sections === module.total_sections && module.total_sections > 0;

  return (
    <Link href={`/modules/${module.id}`} className="group block h-full cursor-pointer">
      <div
        className="h-full rounded-2xl border flex flex-col transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-md overflow-hidden"
        style={{ backgroundColor: topic.bg, borderColor: topic.border }}
      >
        {/* Top */}
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/10 dark:bg-black/30 border border-border/10"
                style={{ color: topic.color }}
              >
                {topic.label}
              </span>
              <DifficultyBadge difficulty={module.difficulty} />
            </div>
            {isCompleted && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent-primary)]" />
            )}
          </div>

          <h3 className="font-black text-lg text-foreground leading-snug mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {module.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Progress bar */}
        {module.completed_sections > 0 && (
          <div className="px-5 pb-3">
            <div className="flex justify-between text-xs text-muted-foreground/85 mb-1.5 font-semibold">
              <span>{module.completed_sections}/{module.total_sections} sections</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/10 dark:bg-black/30 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: "var(--accent-primary)",
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-border/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-mono font-bold text-[var(--accent-primary)]">
              <Zap className="h-3.5 w-3.5" />
              {module.total_xp} XP
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {module.estimated_minutes} min
            </span>
            <span className="hidden sm:inline">
              {module.total_sections} sections
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
  );
}