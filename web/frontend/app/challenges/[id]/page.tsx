// web/frontend/app/challenges/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/challenges/difficulty-badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Challenge } from "@/lib/types";
import { CheckCircle2, Clock, Terminal, Zap } from "lucide-react";

const topicColors: Record<string, string> = {
  docker: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  kubernetes: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  linux: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  cicd: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getChallenge(id)
      .then(setChallenge)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner className="py-40" />;
  if (error || !challenge) return (
    <div className="text-center py-40 text-destructive">
      {error ?? "Challenge not found"}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge variant="outline" className={topicColors[challenge.topic] ?? ""}>
          {challenge.topic}
        </Badge>
        <DifficultyBadge difficulty={challenge.difficulty} />
        {challenge.completed && (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-3">{challenge.title}</h1>
      <p className="text-muted-foreground text-base leading-relaxed mb-6">
        {challenge.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/40">
        <span className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-primary" />
          {challenge.xp} XP
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          ~{challenge.estimated_minutes} minutes
        </span>
      </div>

      {/* How to start */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 mb-6">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          How to start this challenge
        </h2>
        <div className="space-y-2 font-mono text-sm bg-black/40 rounded-lg p-4 border border-border/30">
          <p><span className="text-primary">$</span> orbstack sync</p>
          <p><span className="text-primary">$</span> orbstack start {challenge.id}</p>
          <p className="text-muted-foreground"># Follow the steps printed in your terminal</p>
          <p><span className="text-primary">$</span> orbstack check</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            Install OrbStack Agent
          </a>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          ← Back to challenges
        </Button>
      </div>
    </div>
  );
}