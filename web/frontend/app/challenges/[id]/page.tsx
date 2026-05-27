// web/frontend/app/challenges/[id]/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Challenge } from "@/lib/types";
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  Zap,
  Terminal,
  RefreshCw,
  Lock,
} from "lucide-react";
import Link from "next/link";

const topicConfig: Record<string, { bg: string; border: string; label: string; color: string }> = {
  docker:     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     label: "Docker",     color: "var(--topic-docker-text)" },
  kubernetes: { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", label: "Kubernetes", color: "var(--topic-kubernetes-text)" },
  linux:      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      label: "Linux",      color: "var(--topic-linux-text)" },
  cicd:       { bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       label: "CI/CD",      color: "var(--topic-cicd-text)" },
};

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenge = useCallback(async () => {
    try {
      const data = await api.getChallenge(id);
      setChallenge(data as unknown as Challenge);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setJustRefreshed(false);
    await fetchChallenge();
    setRefreshing(false);
    setJustRefreshed(true);
    setTimeout(() => setJustRefreshed(false), 3000);
  };

  if (loading || authLoading) return <LoadingSpinner className="py-40" />;
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
                backgroundColor: "rgba(var(--accent-primary-rgb), 0.15)",
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

      {/* Progress section — only shown when logged in */}
      {user ? (
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#111] flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-widest text-[#888]">
              Your Progress
            </h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Checking..." : "Refresh Progress"}
            </button>
          </div>

          <div className="px-6 py-6">
            {challenge.completed ? (
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(var(--accent-primary-rgb), 0.15)" }}
                >
                  <CheckCircle2 className="h-6 w-6" style={{ color: "var(--accent-primary)" }} />
                </div>
                <div>
                  <p className="font-bold text-white">Challenge completed!</p>
                  <p className="text-sm text-[#666] mt-0.5">
                    You earned{" "}
                    <span className="font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                      {challenge.xp} XP
                    </span>{" "}
                    for this challenge.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#1a1a1a] border border-[#2a2a2a]">
                  <Terminal className="h-6 w-6 text-[#444]" />
                </div>
                <div>
                  <p className="font-bold text-white">Not completed yet</p>
                  <p className="text-sm text-[#666] mt-0.5">
                    Run{" "}
                    <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#aaa]">
                      orbstack check
                    </code>{" "}
                    in your terminal, then hit Refresh Progress.
                  </p>
                </div>
              </div>
            )}

            {justRefreshed && (
              <p className="mt-4 text-xs text-[#555]">
                ✓ Progress updated just now
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Not logged in — prompt to sign in for progress tracking */
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden mb-6">
          <div className="px-6 py-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#1a1a1a] border border-[#2a2a2a]">
              <Lock className="h-5 w-5 text-[#444]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">Track your progress</p>
              <p className="text-sm text-[#666] mt-0.5">
                Sign in to track XP, streaks, and completed challenges.
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-black"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}

      {/* How to run */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#111]">
          <h2 className="font-bold text-sm uppercase tracking-widest text-[#888]">
            How to run this challenge
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
          <p className="text-[#555]"># Complete the steps shown in your terminal</p>
          <p>
            <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
            <span className="text-white">orbstack check</span>
          </p>
          <p className="text-[#555]"># Then hit "Refresh Progress" above</p>
        </div>
      </div>
    </div>
  );
}