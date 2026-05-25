// web/frontend/components/challenges/challenge-grid.tsx

"use client";

import { useState } from "react";
import { ChallengeCard } from "./challenge-card";
import { Challenge, Difficulty, Topic } from "@/lib/types";

const TOPICS = ["all", "docker", "kubernetes", "linux", "cicd"] as const;
const DIFFICULTIES = ["all", "beginner", "intermediate", "advanced"] as const;

const topicLabels: Record<string, string> = {
  all: "All Topics",
  docker: "Docker",
  kubernetes: "Kubernetes",
  linux: "Linux",
  cicd: "CI/CD",
};

const diffLabels: Record<string, string> = {
  all: "All Levels",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border"
      style={
        active
          ? {
              backgroundColor: "var(--accent-primary)",
              color: "#000",
              borderColor: "var(--accent-primary)",
            }
          : {
              backgroundColor: "#111",
              color: "#888",
              borderColor: "#2a2a2a",
            }
      }
    >
      {children}
    </button>
  );
}

export function ChallengeGrid({ challenges }: { challenges: Challenge[] }) {
  const [topic, setTopic] = useState<"all" | Topic>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const filtered = challenges.filter((c) => {
    if (topic !== "all" && c.topic !== topic) return false;
    if (difficulty !== "all" && c.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <FilterButton key={t} active={topic === t} onClick={() => setTopic(t)}>
              {topicLabels[t]}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <FilterButton key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
              {diffLabels[d]}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-[#555] mb-6 font-mono">
        {filtered.length} challenge{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#555] text-sm">
          No challenges match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      )}
    </div>
  );
}