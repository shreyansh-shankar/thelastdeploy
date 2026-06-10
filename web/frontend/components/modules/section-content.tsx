// web/frontend/components/modules/section-content.tsx

"use client";

import { useRef, useEffect, useCallback } from "react";
import { Section, ModuleDetail } from "@/lib/types";
import { LabBlock } from "./lab-block";
import { CheckCircle2, ArrowLeft, ChevronRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  section: Section;
  module: ModuleDetail;
  isLoggedIn: boolean;
  isSectionComplete: (section: Section) => boolean;
  onScrollComplete: (sectionId: string, sectionXp: number) => void;
  onNavigate: (section: Section) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export function SectionContent({
  section,
  module,
  isLoggedIn,
  isSectionComplete,
  onScrollComplete,
  onNavigate,
  onRefresh,
  refreshing,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const scrolledToBottomRef = useRef(false); // remembers if user scrolled to bottom

  // Reset both flags when switching sections
  useEffect(() => {
    firedRef.current = false;
    scrolledToBottomRef.current = false;
  }, [section.id]);

  // Attempt completion — called whenever scroll or labs state changes
  const tryComplete = useCallback(() => {
    if (!isLoggedIn) return;
    if (isSectionComplete(section)) return;
    if (firedRef.current) return;
    if (!scrolledToBottomRef.current) return; // haven't scrolled down yet

    if (section.labs.length === 0) {
      // Pure reading — scroll is enough
      firedRef.current = true;
      onScrollComplete(section.id, section.xp);
    } else {
      // Lab section — need all labs done too
      const allLabsDone = section.labs.every((l) => l.completed);
      if (allLabsDone) {
        firedRef.current = true;
        onScrollComplete(section.id, section.xp);
      }
      // else: wait — user will hit Refresh after finishing lab
    }
  }, [section, isLoggedIn, isSectionComplete, onScrollComplete]);

  // Intersection observer — just records that user scrolled to bottom
  useEffect(() => {
    if (!isLoggedIn || !sentinelRef.current) return;
    if (isSectionComplete(section)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scrolledToBottomRef.current) {
          scrolledToBottomRef.current = true;
          tryComplete();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [section.id, isLoggedIn, isSectionComplete, tryComplete]);

  // Re-attempt when labs update (user hit Refresh after finishing lab)
  useEffect(() => {
    tryComplete();
  }, [section.labs, tryComplete]);

  const completed = isSectionComplete(section);
  const prevSection = module.sections.find((s) => s.order === section.order - 1);
  const nextSection = module.sections.find((s) => s.order === section.order + 1);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
          <p className="text-xs text-muted-foreground mt-1.5">
            {section.labs.length > 0
              ? `${section.labs.length} lab${section.labs.length !== 1 ? "s" : ""} · ${section.xp + section.labs.reduce((s, l) => s + l.xp, 0)} XP total`
              : `Reading · +${section.xp} XP`}
          </p>
        </div>
        {completed && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 bg-[rgba(var(--accent-primary-rgb),0.08)] border border-[rgba(var(--accent-primary-rgb),0.15)] text-[var(--accent-primary)]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </div>
        )}
      </div>

      {/* Markdown */}
      {section.content && (
        <div className="prose dark:prose-invert prose-sm max-w-none mb-10
          prose-headings:font-black prose-headings:text-foreground
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-strong:text-foreground prose-strong:font-bold
          prose-code:text-[var(--accent-primary)] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-4
          prose-blockquote:border-l-[var(--accent-primary)] prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
          prose-table:text-sm prose-th:text-muted-foreground prose-th:font-semibold prose-td:text-muted-foreground/95
          prose-hr:border-border prose-li:text-muted-foreground prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
        </div>
      )}

      {/* Labs */}
      {section.labs.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground/60">Labs</h3>
            {isLoggedIn && (
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted hover:border-muted-foreground/40 transition-all disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Checking..." : "Refresh Progress"}
              </button>
            )}
          </div>
          {section.labs.map((lab) => (
            <LabBlock key={lab.id} lab={lab} moduleId={module.id} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}

      {/* Scroll sentinel — always present; fires only when conditions met */}
      <div ref={sentinelRef} className="h-1" />

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
        {prevSection ? (
          <button
            onClick={() => onNavigate(prevSection)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
        ) : <div />}

        {nextSection ? (
          <button
            onClick={() => onNavigate(nextSection)}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity cursor-pointer text-[var(--accent-primary)]"
          >
            Next Section <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href="/modules"
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity cursor-pointer text-[var(--accent-primary)]"
          >
            Back to Modules <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}