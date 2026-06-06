// web/frontend/app/modules/[id]/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { ModuleDetail, Section, Lab } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CheckCircle2, Circle, Lock, ChevronRight,
  Zap, ArrowLeft, Terminal, RefreshCw, BookOpen,
} from "lucide-react";
import Link from "next/link";

const topicConfig: Record<string, { bg: string; border: string; label: string; color: string }> = {
  docker:     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     label: "Docker",     color: "var(--topic-docker-text)" },
  kubernetes: { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", label: "Kubernetes", color: "var(--topic-kubernetes-text)" },
  linux:      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      label: "Linux",      color: "var(--topic-linux-text)" },
  cicd:       { bg: "var(--topic-cicd)",       border: "var(--topic-cicd-border)",       label: "CI/CD",      color: "var(--topic-cicd-text)" },
};

export default function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, refreshUser } = useAuth();
  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModule = useCallback(async () => {
    try {
      const data = await api.getModule(id);
      setModule(data);
      setActiveSection((prev) => {
        if (prev) return data.sections.find((s) => s.id === prev.id) ?? data.sections[0];
        return data.sections[0] ?? null;
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchModule(); }, [fetchModule]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchModule();
    await refreshUser();
    setRefreshing(false);
  };

  if (loading) return <LoadingSpinner className="py-40" />;
  if (error || !module) return (
    <div className="text-center py-40 text-red-400 text-sm">{error ?? "Module not found"}</div>
  );

  const topic = topicConfig[module.topic] ?? topicConfig.docker;

  // A section is complete when all its labs are complete
  const isSectionComplete = (section: Section) =>
    section.labs.length > 0 && section.labs.every((l) => l.completed);

  const completedCount = module.sections.filter(isSectionComplete).length;
  const progressPct = module.sections.length > 0
    ? Math.round((completedCount / module.sections.length) * 100)
    : 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">

      {/* Module header bar */}
      <div
        className="border-b border-[#1a1a1a] px-4 py-4 flex items-center justify-between gap-4 shrink-0"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/modules"
            className="flex items-center gap-1.5 text-sm text-[#666] hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:block">Modules</span>
          </Link>
          <div className="w-px h-4 bg-[#2a2a2a]" />
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg shrink-0"
              style={{ color: topic.color, backgroundColor: "rgba(0,0,0,0.5)", border: `1px solid ${topic.border}` }}
            >
              {topic.label}
            </span>
            <h1 className="font-black text-base truncate">{module.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <DifficultyBadge difficulty={module.difficulty} />
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPct}%`, backgroundColor: "var(--accent-primary)" }}
              />
            </div>
            <span className="text-xs font-mono text-[#555]">{completedCount}/{module.sections.length}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
            <Zap className="h-3.5 w-3.5" />
            {module.total_xp} XP
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar — section list */}
        <aside className="w-64 shrink-0 border-r border-[#1a1a1a] bg-[#0a0a0a] overflow-y-auto hidden md:block">
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#444] mb-3">Sections</p>
            <div className="flex flex-col gap-1">
              {module.sections.map((section, idx) => {
                const isActive = activeSection?.id === section.id;
                const completed = isSectionComplete(section);
                const prevCompleted = idx === 0 || isSectionComplete(module.sections[idx - 1]);
                const isLocked = !prevCompleted && !completed;
                const sectionXp = section.labs.reduce((sum, l) => sum + l.xp, 0);

                return (
                  <button
                    key={section.id}
                    onClick={() => !isLocked && setActiveSection(section)}
                    disabled={isLocked}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-all flex items-start gap-3 ${
                      isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    } ${isActive ? "bg-[#1a1a1a] border border-[#2a2a2a]" : "hover:bg-[#111]"}`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4 text-[#444]" />
                      ) : (
                        <Circle className={`h-4 w-4 ${isActive ? "text-white" : "text-[#444]"}`} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold leading-snug truncate ${
                        isActive ? "text-white" : completed ? "text-[#888]" : "text-[#666]"
                      }`}>
                        {section.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#444] flex items-center gap-0.5">
                          <BookOpen className="h-2.5 w-2.5" />
                          {section.labs.length} lab{section.labs.length !== 1 ? "s" : ""}
                        </span>
                        {sectionXp > 0 && (
                          <span className="text-[10px] font-mono" style={{ color: "var(--accent-primary)" }}>
                            +{sectionXp} XP
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right — content area */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
          {activeSection ? (
            <div className="max-w-3xl mx-auto px-6 py-8">

              {/* Section header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-black">{activeSection.title}</h2>
                  <p className="text-xs text-[#555] mt-1">
                    {activeSection.labs.length} lab{activeSection.labs.length !== 1 ? "s" : ""} ·{" "}
                    {activeSection.labs.reduce((sum, l) => sum + l.xp, 0)} XP total
                  </p>
                </div>
                {isSectionComplete(activeSection) && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
                    style={{ color: "var(--accent-primary)", backgroundColor: "rgba(var(--accent-primary-rgb),0.1)" }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Completed
                  </div>
                )}
              </div>

              {/* Markdown content */}
              {activeSection.content && (
                <div className="prose prose-invert prose-sm max-w-none mb-10
                  prose-headings:font-black prose-headings:text-white
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-[#aaa] prose-p:leading-relaxed
                  prose-strong:text-white prose-strong:font-bold
                  prose-code:text-[var(--accent-primary)] prose-code:bg-[#111] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-[#2a2a2a] prose-pre:rounded-xl prose-pre:p-4
                  prose-blockquote:border-l-[var(--accent-primary)] prose-blockquote:text-[#666] prose-blockquote:bg-[#0d0d0d] prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
                  prose-table:text-sm prose-th:text-[#888] prose-th:font-semibold prose-td:text-[#aaa]
                  prose-hr:border-[#1a1a1a]
                  prose-li:text-[#aaa]
                  prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {activeSection.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Labs */}
              {activeSection.labs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-[#888]">Labs</h3>
                    {user && (
                      <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444] transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                        {refreshing ? "Checking..." : "Refresh Progress"}
                      </button>
                    )}
                  </div>

                  {activeSection.labs.map((lab) => (
                    <LabBlock key={lab.id} lab={lab} moduleId={id} user={user} />
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1a1a1a]">
                {module.sections.find((s) => s.order === activeSection.order - 1) ? (
                  <button
                    onClick={() => {
                      const prev = module.sections.find((s) => s.order === activeSection.order - 1);
                      if (prev) setActiveSection(prev);
                    }}
                    className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                ) : <div />}

                {module.sections.find((s) => s.order === activeSection.order + 1) ? (
                  <button
                    onClick={() => {
                      const next = module.sections.find((s) => s.order === activeSection.order + 1);
                      if (next) setActiveSection(next);
                    }}
                    className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Next Section
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href="/modules"
                    className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Back to Modules
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#555] text-sm">
              Select a section to begin
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Lab block component ────────────────────────────────────────────────────

function LabBlock({ lab, moduleId, user }: { lab: Lab; moduleId: string; user: unknown | null }) {
  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#111] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {lab.completed ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-primary)" }} />
          ) : (
            <Circle className="h-4 w-4 text-[#444] shrink-0" />
          )}
          <div>
            <p className="font-bold text-sm text-white">{lab.title}</p>
            <p className="text-[10px] font-mono text-[#555] mt-0.5">{lab.id}</p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold shrink-0" style={{ color: "var(--accent-primary)" }}>
          +{lab.xp} XP
        </span>
      </div>

      <div className="px-6 py-5">
        {!user ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#666]">Sign in to track your progress on this lab.</p>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-bold text-black shrink-0"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Sign in
            </Link>
          </div>
        ) : lab.completed ? (
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.15)" }}
            >
              <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Lab completed!</p>
              <p className="text-xs text-[#666] mt-0.5">
                You earned{" "}
                <span className="font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                  {lab.xp} XP
                </span>{" "}
                for this lab.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                <Terminal className="h-5 w-5 text-[#444]" />
              </div>
              <div>
                <p className="font-bold text-white">Complete this lab in your terminal</p>
                <p className="text-sm text-[#666] mt-0.5">
                  Use the <code className="text-xs bg-[#111] px-1.5 py-0.5 rounded font-mono" style={{ color: "var(--accent-primary)" }}>tld</code> agent to start and validate this lab.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#2a2a2a] bg-black/40 px-5 py-4 font-mono text-sm space-y-2">
              <p><span style={{ color: "var(--accent-primary)" }}>❯</span> <span className="text-white">tld start {lab.id}</span></p>
              <p className="text-[#555]"># Complete the task shown in your terminal</p>
              <p><span style={{ color: "var(--accent-primary)" }}>❯</span> <span className="text-white">tld check</span></p>
            </div>

            {lab.estimated_minutes && (
              <p className="text-xs text-[#555]">Estimated time: ~{lab.estimated_minutes} minutes</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}