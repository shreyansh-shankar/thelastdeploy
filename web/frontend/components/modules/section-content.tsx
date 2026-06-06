// web/frontend/components/modules/section-content.tsx
//
// The main reading area for a section. Handles:
//  - Markdown rendering
//  - Lab blocks
//  - Scroll sentinel → triggers reading complete
//  - Prev/Next navigation

"use client";

import { useRef, useEffect } from "react";
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

  // Reset fired flag when section changes
  useEffect(() => {
    firedRef.current = false;
  }, [section.id]);

  // Intersection observer for scroll-to-end detection
  useEffect(() => {
    if (!isLoggedIn || section.labs.length > 0 || !sentinelRef.current) return;
    if (isSectionComplete(section)) return; // already done

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          onScrollComplete(section.id, section.xp);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [section.id, isLoggedIn, isSectionComplete, onScrollComplete]);

  const completed = isSectionComplete(section);
  const prevSection = module.sections.find((s) => s.order === section.order - 1);
  const nextSection = module.sections.find((s) => s.order === section.order + 1);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black">{section.title}</h2>
          <p className="text-xs text-[#555] mt-1">
            {section.labs.length > 0
              ? `${section.labs.length} lab${section.labs.length !== 1 ? "s" : ""} · ${section.xp + section.labs.reduce((s, l) => s + l.xp, 0)} XP total`
              : `Reading · +${section.xp} XP`}
          </p>
        </div>
        {completed && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
            style={{ color: "var(--accent-primary)", backgroundColor: "rgba(var(--accent-primary-rgb),0.1)" }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </div>
        )}
      </div>

      {/* Markdown */}
      {section.content && (
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
          prose-hr:border-[#1a1a1a] prose-li:text-[#aaa]
          prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
        </div>
      )}

      {/* Labs */}
      {section.labs.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#888]">Labs</h3>
            {isLoggedIn && (
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444] transition-all disabled:opacity-50"
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

      {/* Scroll sentinel — for reading sections only */}
      {section.labs.length === 0 && <div ref={sentinelRef} className="h-1" />}

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1a1a1a]">
        {prevSection ? (
          <button
            onClick={() => onNavigate(prevSection)}
            className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
        ) : <div />}

        {nextSection ? (
          <button
            onClick={() => onNavigate(nextSection)}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-80"
            style={{ color: "var(--accent-primary)" }}
          >
            Next Section <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href="/modules"
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-80"
            style={{ color: "var(--accent-primary)" }}
          >
            Back to Modules <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}