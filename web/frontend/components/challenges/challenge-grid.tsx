// web/frontend/components/challenges/challenge-grid.tsx

"use client";

import { useState } from "react";
import { ChallengeCard } from "./challenge-card";
import { Challenge, Difficulty, Topic } from "@/lib/types";
import { Button } from "@/components/ui/button";

const TOPICS = ["all", "docker", "kubernetes", "linux", "cicd"] as const;
const DIFFICULTIES = ["all", "beginner", "intermediate", "advanced"] as const;

interface ChallengeGridProps {
  challenges: Challenge[];
}

export function ChallengeGrid({ challenges }: ChallengeGridProps) {
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
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Topic</span>
          {TOPICS.map((t) => (
            <Button
              key={t}
              variant={topic === t ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs capitalize"
              onClick={() => setTopic(t)}
            >
              {t}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Level</span>
          {DIFFICULTIES.map((d) => (
            <Button
              key={d}
              variant={difficulty === d ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs capitalize"
              onClick={() => setDifficulty(d)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
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