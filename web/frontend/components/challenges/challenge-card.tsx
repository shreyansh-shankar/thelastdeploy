// web/frontend/components/challenges/challenge-card.tsx

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "./difficulty-badge";
import { Challenge } from "@/lib/types";
import { CheckCircle2, Clock, Zap } from "lucide-react";

const topicColors: Record<string, string> = {
  docker: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  kubernetes: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  linux: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  cicd: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Link href={`/challenges/${challenge.id}`} className="group block h-full">
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur transition-all duration-200 group-hover:border-primary/40 group-hover:bg-card group-hover:shadow-lg group-hover:shadow-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={topicColors[challenge.topic] ?? ""}
              >
                {challenge.topic}
              </Badge>
              <DifficultyBadge difficulty={challenge.difficulty} />
            </div>
            {challenge.completed && (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            )}
          </div>
          <h3 className="mt-3 font-semibold text-base leading-snug group-hover:text-primary transition-colors">
            {challenge.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {challenge.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            {challenge.xp} XP
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {challenge.estimated_minutes} min
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}