// web/frontend/components/modules/section-sidebar.tsx

"use client";

import { Section } from "@/lib/types";
import { CheckCircle2, BookOpen } from "lucide-react";

interface Props {
  sections: Section[];
  activeId: string | null;
  onSelect: (section: Section) => void;
  isSectionComplete: (section: Section) => boolean;
}

export function SectionSidebar({ sections, activeId, onSelect, isSectionComplete }: Props) {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card overflow-y-auto hidden md:block">
      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/55 mb-5 pl-2">
          Course Syllabus
        </p>
        <div className="flex flex-col">
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            const completed = isSectionComplete(section);
            // Total XP = reading XP from section.yaml + all labs XP
            const totalXp = section.xp + section.labs.reduce((sum, l) => sum + l.xp, 0);

            return (
              <div key={section.id} className="relative group/step flex">
                {/* Vertical Stepper Connector Line */}
                {index < sections.length - 1 && (
                  <div className="absolute left-[21px] top-8 bottom-0 w-px bg-border group-hover/step:bg-muted-foreground/20 transition-colors" />
                )}

                <button
                  onClick={() => onSelect(section)}
                  className={`w-full text-left pl-3 pr-2 py-3.5 rounded-xl transition-all flex items-start gap-4 cursor-pointer border border-transparent ${
                    isActive 
                      ? "bg-muted/70 border-border/80 shadow-sm" 
                      : "hover:bg-muted/30"
                  }`}
                >
                  {/* Stepper bubble */}
                  <div className="relative shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full z-10 transition-transform duration-300">
                    {completed ? (
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent-primary)] bg-background rounded-full shrink-0" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center bg-background text-[9px] font-mono font-bold shrink-0 transition-colors ${
                        isActive 
                          ? "border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm" 
                          : "border-border text-muted-foreground/60"
                      }`}>
                        {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Syllabus Details */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold leading-snug truncate transition-colors ${
                      isActive ? "text-foreground font-black" : completed ? "text-muted-foreground" : "text-muted-foreground/80"
                    }`}>
                      {section.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-muted-foreground/50 flex items-center gap-0.5 font-medium">
                        <BookOpen className="h-2.5 w-2.5" />
                        {section.labs.length > 0
                          ? `${section.labs.length} lab${section.labs.length !== 1 ? "s" : ""}`
                          : "Reading"}
                      </span>
                      <span className="text-[10px] font-mono font-black text-[var(--accent-primary)]/80">
                        +{totalXp} XP
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}