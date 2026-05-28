// web/frontend/components/modules/module-grid.tsx

"use client";

import { useState } from "react";
import { Module, Difficulty, Topic } from "@/lib/types";
import { ModuleCard } from "./module-card";

const TOPICS = ["all", "docker", "kubernetes", "linux", "cicd"] as const;
const DIFFICULTIES = ["all", "beginner", "intermediate", "advanced"] as const;

const topicLabels: Record<string, string> = {
  all: "All Topics", docker: "Docker",
  kubernetes: "Kubernetes", linux: "Linux", cicd: "CI/CD",
};

const diffLabels: Record<string, string> = {
  all: "All Levels", beginner: "Beginner",
  intermediate: "Intermediate", advanced: "Advanced",
};

function FilterBtn({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border"
      style={active
        ? { backgroundColor: "var(--accent-primary)", color: "#000", borderColor: "var(--accent-primary)" }
        : { backgroundColor: "#111", color: "#888", borderColor: "#2a2a2a" }
      }
    >
      {children}
    </button>
  );
}

export function ModuleGrid({ modules }: { modules: Module[] }) {
  const [topic, setTopic] = useState<"all" | Topic>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const filtered = modules.filter((m) => {
    if (topic !== "all" && m.topic !== topic) return false;
    if (difficulty !== "all" && m.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <FilterBtn key={t} active={topic === t} onClick={() => setTopic(t)}>
              {topicLabels[t]}
            </FilterBtn>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <FilterBtn key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
              {diffLabels[d]}
            </FilterBtn>
          ))}
        </div>
      </div>

      <p className="text-sm text-[#555] mb-6 font-mono">
        {filtered.length} module{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#555] text-sm">
          No modules match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      )}
    </div>
  );
}