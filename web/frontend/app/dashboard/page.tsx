// web/frontend/app/dashboard/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { ModuleDetail } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActivityRing } from "@/components/dashboard/activity-ring";
import { SectionBadge } from "@/components/dashboard/section-badge";
import { getRank, getNextRank, getXpProgress, TOTAL_SECTIONS } from "@/lib/ranks";
import { Zap, Flame, Trophy, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState<ModuleDetail[]>([]);
  const [modulesLoading, setModulesLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const fetchModules = useCallback(async () => {
    try {
      const { modules: list } = await api.getModules();
      const details = await Promise.all(list.map((m) => api.getModule(m.id)));
      setModules(details);
    } catch {
      // silently fail
    } finally {
      setModulesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchModules();
  }, [user, fetchModules]);

  if (loading || !user) return <LoadingSpinner className="py-40" />;

  const rank = getRank(user.xp);
  const nextRank = getNextRank(user.xp);
  const xpProgress = getXpProgress(user.xp);

  // Helper: is a module fully complete?
  const isModuleComplete = (m: ModuleDetail) => {
    const allLabs = m.sections.flatMap((s) => s.labs);
    return allLabs.length > 0 && allLabs.every((l) => user.completed_labs.includes(l.id));
  };

  const isModuleInProgress = (m: ModuleDetail) => {
    const allLabs = m.sections.flatMap((s) => s.labs);
    return allLabs.some((l) => user.completed_labs.includes(l.id)) && !isModuleComplete(m);
  };

  // build a map of labId → moduleId for badge links
  const labToModule: Record<string, string> = {};
  modules.forEach((m) => {
    m.sections.forEach((s) => {
      s.labs.forEach((l) => { labToModule[l.id] = m.id; });
    });
  });

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
              style={{ width: `${xpProgress.pct}%`, backgroundColor: rank.color, boxShadow: `0 0 8px ${rank.color}80` }}
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
            {user.streak_days}<span className="text-sm font-normal text-[#666] ml-1">days</span>
          </p>
        </div>

        <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--topic-kubernetes)", borderColor: "var(--topic-kubernetes-border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: "var(--topic-kubernetes-text)" }} />
            <span className="text-xs text-[#555] font-semibold uppercase tracking-wider">Completed</span>
          </div>
          <p className="text-3xl font-black font-mono" style={{ color: "var(--topic-kubernetes-text)" }}>
            {modulesLoading ? "—" : modules.filter(isModuleComplete).length}
            <span className="text-sm font-normal text-[#666] ml-1">modules</span>
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
                value={modulesLoading ? 0 : modules.filter(isModuleComplete).length}
                max={modules.length || 1}
                color="var(--accent-primary)"
                label="Modules"
                sublabel={modulesLoading ? "loading..." : `${modules.length} total`}
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

          {/* Modules progress */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg">Modules</h2>
              <Link
                href="/modules"
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: "var(--accent-primary)" }}
              >
                Browse all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {modulesLoading ? (
              <LoadingSpinner className="py-6" />
            ) : (() => {
              const completedModules = modules.filter(isModuleComplete);
              const inProgressModules = modules.filter(isModuleInProgress);

              if (completedModules.length === 0 && inProgressModules.length === 0) {
                return (
                  <div className="text-center py-10">
                    <Terminal className="h-8 w-8 text-[#2a2a2a] mx-auto mb-3" />
                    <p className="text-[#555] text-sm">No modules started yet.</p>
                    <Link href="/modules" className="text-sm font-semibold mt-2 inline-block hover:opacity-80" style={{ color: "var(--accent-primary)" }}>
                      Start your first module →
                    </Link>
                  </div>
                );
              }

              return (
                <div className="flex flex-col gap-3">
                  {completedModules.map((m) => (
                    <Link key={m.id} href={`/modules/${m.id}`}>
                      <div
                        className="flex items-center justify-between px-4 py-3 rounded-xl border transition-all hover:scale-[1.01]"
                        style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.05)", borderColor: "rgba(var(--accent-primary-rgb),0.2)" }}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "var(--accent-primary)" }} />
                          <div>
                            <p className="font-bold text-sm text-white">{m.title}</p>
                            <p className="text-xs text-[#555] mt-0.5">{m.sections.length} sections · {m.total_xp} XP earned</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ color: "var(--accent-primary)", backgroundColor: "rgba(var(--accent-primary-rgb),0.1)" }}>
                          Complete
                        </span>
                      </div>
                    </Link>
                  ))}

                  {inProgressModules.map((m) => {
                    const allLabs = m.sections.flatMap((s) => s.labs);
                    const done = allLabs.filter((l) => user.completed_labs.includes(l.id)).length;
                    const pct = allLabs.length > 0 ? Math.round((done / allLabs.length) * 100) : 0;
                    return (
                      <Link key={m.id} href={`/modules/${m.id}`}>
                        <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#111] transition-all hover:scale-[1.01] hover:border-[#3a3a3a]">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-5 h-5 rounded-full border-2 border-[#3a3a3a] shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm text-white truncate">{m.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-20 h-1 rounded-full bg-[#1a1a1a] overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "var(--accent-primary)" }} />
                                </div>
                                <span className="text-xs text-[#555] font-mono">{done}/{allLabs.length} labs</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-[#555] shrink-0 ml-3">{pct}%</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Completed labs badges */}
          {user.completed_labs.length > 0 && !modulesLoading && (
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
              <h2 className="font-black text-lg mb-4">Completed Labs</h2>
              <div className="flex flex-wrap gap-2">
                {user.completed_labs.map((labId) => (
                  <SectionBadge key={labId} sectionId={labId} moduleId={labToModule[labId]} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6">
            <h2 className="font-black text-lg mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "Browse Modules", href: "/modules" },
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
                ["tld login", "Authenticate"],
                ["tld sync --all", "Fetch modules & labs"],
                ["tld start <lab-id>", "Start a lab"],
                ["tld check", "Validate & earn XP"],
                ["tld status", "Show active lab"],
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