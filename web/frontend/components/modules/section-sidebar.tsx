// web/frontend/components/modules/section-sidebar.tsx

"use client";

import { Section } from "@/lib/types";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";

interface Props {
  sections: Section[];
  activeId: string | null;
  onSelect: (section: Section) => void;
  isSectionComplete: (section: Section) => boolean;
}

export function SectionSidebar({ sections, activeId, onSelect, isSectionComplete }: Props) {
  return (
    <aside className="w-64 shrink-0 border-r border-[#1a1a1a] bg-[#0a0a0a] overflow-y-auto hidden md:block">
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#444] mb-3">Sections</p>
        <div className="flex flex-col gap-1">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            const completed = isSectionComplete(section);
            // Total XP = reading XP from section.yaml + all labs XP
            const totalXp = section.xp + section.labs.reduce((sum, l) => sum + l.xp, 0);

            return (
              <button
                key={section.id}
                onClick={() => onSelect(section)}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                  isActive ? "bg-[#1a1a1a] border border-[#2a2a2a]" : "hover:bg-[#111]"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
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
                      {section.labs.length > 0
                        ? `${section.labs.length} lab${section.labs.length !== 1 ? "s" : ""}`
                        : "Reading"}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--accent-primary)" }}>
                      +{totalXp} XP
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}