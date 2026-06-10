// web/frontend/components/modules/module-grid.tsx

"use client";

import { useState, useMemo } from "react";
import { Module, Difficulty, Topic } from "@/lib/types";
import { ModuleCard } from "./module-card";
import { ModuleFilters } from "./module-filters";

export function ModuleGrid({ modules }: { modules: Module[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [topic, setTopic] = useState<"all" | Topic>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      if (topic !== "all" && m.topic !== topic) return false;
      if (difficulty !== "all" && m.difficulty !== difficulty) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const titleMatch = m.title.toLowerCase().includes(q);
        const descMatch = m.description?.toLowerCase().includes(q) ?? false;
        if (!titleMatch && !descMatch) return false;
      }
      return true;
    });
  }, [modules, topic, difficulty, searchQuery]);

  const hasActiveFilters = searchQuery || topic !== "all" || difficulty !== "all";

  return (
    <div>
      <div className="mb-10">
        <ModuleFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTopic={topic}
          onTopicChange={setTopic}
          selectedDifficulty={difficulty}
          onDifficultyChange={setDifficulty}
          resultCount={filtered.length}
          totalCount={modules.length}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-4 opacity-20">🔍</div>
          <p className="text-muted-foreground text-sm font-semibold mb-1">
            {searchQuery
              ? `No modules matching "${searchQuery}"`
              : "No modules match your filters"}
          </p>
          <p className="text-xs text-muted-foreground/60 mb-4">
            Try adjusting your search or filter criteria
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => { setSearchQuery(""); setTopic("all"); setDifficulty("all"); }}
              className="text-sm font-semibold text-[var(--accent-primary)] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
          {filtered.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      )}
    </div>
  );
}