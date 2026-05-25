// web/frontend/app/challenges/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Challenge } from "@/lib/types";
import { CheckCircle2, Clock, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

const topicConfig: Record<string, { bg: string; border: string; label: string; color: string }> = {
  docker:     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     label: "Docker",     color: "var(--topic-docker-text)" },
  kubernetes: { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", label: "Kubernetes", color: "var(--topic-kubernetes-text)" },
  linux:      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      label: "Linux",      color: "var(--topic-linux-text)" },
  cicd:       { bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       label: "CI/CD",      color: "var(--topic-cicd-text)" },
};

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getChallenge(id)
      .then((data) => setChallenge(data as unknown as Challenge))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner className="py-40" />;
  if (error || !challenge) return (
    <div className="text-center py-40 text-red-400 text-sm">
      {error ?? "Challenge not found"}
    </div>
  );

  const topic = topicConfig[challenge.topic] ?? topicConfig.docker;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        href="/challenges"
        className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to challenges
      </Link>

      {/* Header card */}
      <div
        className="rounded-2xl p-8 border mb-6"
        style={{ backgroundColor: topic.bg, borderColor: topic.border }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
            style={{ color: topic.color, backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            {topic.label}
          </span>
          <DifficultyBadge difficulty={challenge.difficulty} />
          {challenge.completed && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              style={{
                color: "var(--accent-primary)",
                backgroundColor: "rgba(var(--accent-primary-rgb), 0.1)",
              }}
            >
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </span>
          )}
        </div>

        <h1 className="text-3xl font-black text-white mb-3">{challenge.title}</h1>
        <p className="text-[#aaa] leading-relaxed">{challenge.description}</p>

        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 text-sm">
          <span className="flex items-center gap-1.5 font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
            <Zap className="h-4 w-4" />
            {challenge.xp} XP
          </span>
          <span className="flex items-center gap-1.5 text-[#888]">
            <Clock className="h-4 w-4" />
            ~{challenge.estimated_minutes} minutes
          </span>
        </div>
      </div>

      {/* How to start */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#111]">
          <h2 className="font-bold text-sm uppercase tracking-widest text-[#888]">
            How to start
          </h2>
        </div>
        <div className="px-6 py-5 font-mono text-sm space-y-2">
          <p>
            <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
            <span className="text-white">orbstack sync</span>
          </p>
          <p>
            <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
            <span className="text-white">orbstack start {challenge.id}</span>
          </p>
          <p className="text-[#555]"># Follow the steps in your terminal</p>
          <p>
            <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
            <span className="text-white">orbstack check</span>
          </p>
        </div>
      </div>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black transition-all hover:scale-105"
        style={{
          backgroundColor: "var(--accent-primary)",
          boxShadow: "0 0 20px rgba(var(--accent-primary-rgb), 0.25)",
        }}
      >
        Install OrbStack Agent
        <ArrowLeft className="h-4 w-4 rotate-180" />
      </a>
    </div>
  );
}