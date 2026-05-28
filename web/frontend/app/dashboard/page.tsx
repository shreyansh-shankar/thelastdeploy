// web/frontend/app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActivityRing } from "@/components/dashboard/activity-ring";
import { ChallengeBadge } from "@/components/dashboard/challenge-badge";
import { getRank, getNextRank, getXpProgress, TOTAL_CHALLENGES } from "@/lib/ranks";
import { Zap, Flame, Trophy, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <LoadingSpinner className="py-40" />;

  const rank = getRank(user.xp);
  const nextRank = getNextRank(user.xp);
  const xpProgress = getXpProgress(user.xp);
  const completionPct = Math.round((user.completed_challenges.length / TOTAL_CHALLENGES) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Top banner */}
      <div
        className="rounded-2xl border p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{
          background: `linear-gradient(135deg, rgba(var(--accent-primary-rgb),0.08) 0%, rgba(0,0,0,0) 60%)`,
          borderColor: "rgba(var(--accent-primary-rgb), 0.15)",
        }}
      >
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 border-2" style={{ borderColor: rank.color }}>
            <AvatarFallback
              className="text-xl font-black"
              style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
            >
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black">{user.username}</h1>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full border"
                style={{ color: rank.color, borderColor: `${rank.color}40`, backgroundColor: `${rank.color}15` }}
              >
                {rank.label}
              </span>
            </div>
            <p className="text-[#555] text-sm">{user.email}</p>
            {nextRank && (
              <p className="text-xs text-[#555] mt-1">
                <span style={{ color: rank.color }}>{xpProgress.needed - xpProgress.current} XP</span>
                {" "}to reach{" "}
                <span style={{ color: nextRank.color }}>{nextRank.label}</span>
              </p>
            )}
          </div>
        </div>

        {/* XP progress bar */}
        <div className="w-full sm:w-64">
          <div className="flex justify-between text-xs text-[#555] mb-2">
            <span>Rank Progress</span>
            <span className="font-mono" style={{ color: rank.color }}>
              {xpProgress.current} / {xpProgress.needed || "MAX"}
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${xpProgress.pct}%`,
                backgroundColor: rank.color,
                boxShadow: `0 0 8px ${rank.color}80`,
              }}
            />
          </div>
          <p className="text-[10px] text-[#444] mt-1">{rank.description}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
            <span className="text-xs text-[#555] font-semibold uppercase tracking-wider">Total XP</span>
          </div>
          <p className="text-3xl font-black font-mono" style={{ color: "var(--accent-primary)" }}>{user.xp}</p>
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--topic-linux)", borderColor: "var(--topic-linux-border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4" style={{ color: "var(--topic-linux-text)" }} />
            <span className="text-xs text-[#555] font-semibold uppercase tracking-wider">Streak</span>
          </div>
          <p className="text-3xl font-black font-mono" style={{ color: "var(--topic-linux-text)" }}>
            {user.streak_days}
            <span className="text-sm font-normal text-[#666] ml-1">days</span>
          </p>
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--topic-kubernetes)", borderColor: "var(--topic-kubernetes-border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: "var(--topic-kubernetes-text)" }} />
            <span className="text-xs text-[#555] font-semibold uppercase tracking-wider">Completed</span>
          </div>
          <p className="text-3xl font-black font-mono" style={{ color: "var(--topic-kubernetes-text)" }}>
            {user.completed_challenges.length}
            <span className="text-sm font-normal text-[#666] ml-1">/ {TOTAL_CHALLENGES}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4" style={{ color: rank.color }} />
            <span className="text-xs text-[#555] font-semibold uppercase tracking-wider">Rank</span>
          </div>
          <p className="text-xl font-black" style={{ color: rank.color }}>{rank.label}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Progress rings */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <h2 className="font-black text-lg mb-6">Progress Overview</h2>
            <div className="flex flex-wrap items-center justify-around gap-8">
              <ActivityRing
                value={user.completed_challenges.length}
                max={TOTAL_CHALLENGES}
                color="var(--accent-primary)"
                label="Challenges"
                sublabel={`${completionPct}% complete`}
              />
              <ActivityRing
                value={xpProgress.current}
                max={xpProgress.needed || 1}
                color={rank.color}
                label="Rank XP"
                sublabel={`${xpProgress.pct}% to next`}
              />
              <ActivityRing
                value={user.streak_days}
                max={7}
                color="var(--topic-linux-text)"
                label="Streak"
                sublabel="days this week"
              />
            </div>
          </div>

          {/* Completed challenges */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg">Completed Challenges</h2>
              <Link
                href="/challenges"
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: "var(--accent-primary)" }}
              >
                Browse all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {user.completed_challenges.length === 0 ? (
              <div className="text-center py-10">
                <Terminal className="h-8 w-8 text-[#2a2a2a] mx-auto mb-3" />
                <p className="text-[#555] text-sm">No challenges completed yet.</p>
                <Link href="/challenges" className="text-sm font-semibold mt-2 inline-block hover:opacity-80" style={{ color: "var(--accent-primary)" }}>
                  Start your first challenge →
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.completed_challenges.map((id) => (
                  <ChallengeBadge key={id} id={id} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <h2 className="font-black text-lg mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "Browse Challenges", href: "/challenges" },
                { label: "View Leaderboard", href: "/leaderboard" },
                { label: "My Profile", href: "/profile" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#111] hover:bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all group"
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <ArrowRight className="h-4 w-4 text-[#555] group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <h2 className="font-black text-lg mb-4">Agent Reference</h2>
            <div className="space-y-2 font-mono text-xs">
              {[
                ["orbstack login", "Authenticate"],
                ["orbstack sync", "Fetch challenges"],
                ["orbstack start <id>", "Start a lab"],
                ["orbstack check", "Validate & earn XP"],
                ["orbstack status", "Show active lab"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex flex-col gap-0.5 p-2.5 rounded-lg bg-[#111] border border-[#1a1a1a]">
                  <span style={{ color: "var(--accent-primary)" }}>{cmd}</span>
                  <span className="text-[#555] text-[11px]">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}