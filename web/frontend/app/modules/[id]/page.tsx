// web/frontend/app/modules/[id]/page.tsx

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { ModuleDetail, Section } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import { SectionSidebar } from "@/components/modules/section-sidebar";
import { SectionContent } from "@/components/modules/section-content";
import { CompletionToast } from "@/components/modules/completion-toast";
import { useSectionComplete } from "@/lib/module-detail/use-section-complete";
import { updateModuleInMemoryCache } from "@/hooks/use-modules";
import { updateDashboardCacheModule } from "@/lib/dashboard/use-dashboard-cache";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

const topicConfig: Record<string, { border: string; label: string; color: string }> = {
  docker:     { border: "var(--topic-docker-border)",     label: "Docker",     color: "var(--topic-docker-text)" },
  kubernetes: { border: "var(--topic-kubernetes-border)", label: "Kubernetes", color: "var(--topic-kubernetes-text)" },
  linux:      { border: "var(--topic-linux-border)",      label: "Linux",      color: "var(--topic-linux-text)" },
  cicd:       { border: "var(--topic-cicd-border)",       label: "CI/CD",      color: "var(--topic-cicd-text)" },
};

interface Toast {
  sectionTitle: string;
  xpAwarded: number;
}

export default function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, refreshUser } = useAuth();
  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Optimistic section completion tracking (before API confirms)
  const [optimisticCompleted, setOptimisticCompleted] = useState<Set<string>>(new Set());

  const fetchModule = useCallback(async () => {
    try {
      const data = await api.getModule(id);
      setModule(data);
      updateModuleInMemoryCache(data);
      updateDashboardCacheModule(data);
      setActiveSection((prev) =>
        prev ? data.sections.find((s) => s.id === prev.id) ?? data.sections[0] : data.sections[0] ?? null
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchModule(); }, [fetchModule]);

  // Reset scroll on section change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeSection?.id]);

  // Called instantly (optimistic) when scroll sentinel fires
  const handleOptimisticComplete = useCallback(
    (sectionId: string, xpAwarded: number) => {
      setOptimisticCompleted((prev) => new Set([...prev, sectionId]));
      const section = module?.sections.find((s) => s.id === sectionId);
      if (section) {
        setToast({ sectionTitle: section.title, xpAwarded });
      }
      // Refresh user XP in background — don't await
      refreshUser();
    },
    [module, refreshUser]
  );

  const { completeSection } = useSectionComplete({ onComplete: handleOptimisticComplete });

  const handleScrollComplete = useCallback(
    (sectionId: string, sectionXp: number) => {
      completeSection(id, sectionId, sectionXp);
    },
    [id, completeSection]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchModule();
    await refreshUser();
    setRefreshing(false);
  };

  const isSectionComplete = useCallback(
    (section: Section): boolean => {
      return optimisticCompleted.has(section.id) || section.section_completed;
    },
    [optimisticCompleted]
  );

  if (loading) return <LoadingSpinner className="py-40" />;
  if (error || !module) return (
    <div className="text-center py-40 text-red-400 text-sm">{error ?? "Module not found"}</div>
  );

  const topic = topicConfig[module.topic] ?? topicConfig.docker;
  const completedCount = module.sections.filter(isSectionComplete).length;
  const progressPct = module.sections.length > 0
    ? Math.round((completedCount / module.sections.length) * 100)
    : 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">

      {/* Header bar */}
      <div className="border-b border-[#1a1a1a] px-4 py-4 flex items-center justify-between gap-4 shrink-0 bg-[#0a0a0a]">
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

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <SectionSidebar
          sections={module.sections}
          activeId={activeSection?.id ?? null}
          onSelect={(s) => setActiveSection(s)}
          isSectionComplete={isSectionComplete}
        />

        <main ref={contentRef} className="flex-1 overflow-y-auto bg-[#0a0a0a]">
          {activeSection ? (
            <SectionContent
              section={activeSection}
              module={module}
              isLoggedIn={!!user}
              isSectionComplete={isSectionComplete}
              onScrollComplete={handleScrollComplete}
              onNavigate={(s) => setActiveSection(s)}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[#555] text-sm">
              Select a section to begin
            </div>
          )}
        </main>
      </div>

      {/* Completion toast */}
      {toast && (
        <CompletionToast
          sectionTitle={toast.sectionTitle}
          xpAwarded={toast.xpAwarded}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}