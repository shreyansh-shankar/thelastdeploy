// web/frontend/app/challenges/page.tsx

"use client";

import { useChallenges } from "@/hooks/use-challenges";
import { ChallengeGrid } from "@/components/challenges/challenge-grid";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Container, Server, Monitor, GitBranch, Zap } from "lucide-react";

const topicStats = [
  { key: "docker",     label: "Docker",     icon: Container, bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     color: "var(--topic-docker-text)" },
  { key: "kubernetes", label: "Kubernetes", icon: Server,    bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", color: "var(--topic-kubernetes-text)" },
  { key: "linux",      label: "Linux",      icon: Monitor,   bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      color: "var(--topic-linux-text)" },
  { key: "cicd",       label: "CI/CD",      icon: GitBranch, bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       color: "var(--topic-cicd-text)" },
];

export default function ChallengesPage() {
  const { challenges, loading, error } = useChallenges();

  const countByTopic = (topic: string) =>
    challenges.filter((c) => c.topic === topic).length;

  return (
    <div>
      {/* Header */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Challenges</h1>
              <p className="mt-2 text-[#888] max-w-xl">
                Hands-on labs for Docker, Kubernetes, Linux, and CI/CD.
                No account needed to browse.
              </p>
            </div>
            {!loading && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2a2a2a] bg-[#0d0d0d]">
                <Zap className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                <span className="font-mono font-bold text-sm" style={{ color: "var(--accent-primary)" }}>
                  {challenges.length}
                </span>
                <span className="text-[#555] text-sm">challenges available</span>
              </div>
            )}
          </div>

          {/* Topic cards */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {topicStats.map(({ key, label, icon: Icon, bg, border, color }) => (
                <div
                  key={key}
                  className="rounded-xl border p-4 flex items-center gap-3"
                  style={{ backgroundColor: bg, borderColor: border }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color }}>{label}</p>
                    <p className="text-lg font-black text-white">{countByTopic(key)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && <div className="text-center py-20 text-red-400 text-sm">Failed to load challenges: {error}</div>}
        {!loading && !error && <ChallengeGrid challenges={challenges} />}
      </div>
    </div>
  );
}