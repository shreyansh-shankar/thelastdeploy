// web/frontend/app/leaderboard/page.tsx

"use client";

import { useLeaderboard } from "@/hooks/use-leaderboard";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const rankStyles: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-300",
  3: "text-amber-600",
};

export default function LeaderboardPage() {
  const { leaderboard, loading, error } = useLeaderboard();

  return (
    <div>
      <PageHeader
        title="Leaderboard"
        description="Top learners ranked by XP earned across all challenges."
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && <div className="text-center py-20 text-destructive">{error}</div>}
        {!loading && !error && (
          <div className="rounded-xl border border-border/50 overflow-hidden">
            {leaderboard.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No entries yet. Be the first!
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] border-b border-border/40">
                  <tr>
                    <th className="text-left px-5 py-3 text-muted-foreground font-medium">Rank</th>
                    <th className="text-left px-5 py-3 text-muted-foreground font-medium">User</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">Challenges</th>
                    <th className="text-right px-5 py-3 text-muted-foreground font-medium">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr
                      key={entry.rank}
                      className="border-b border-border/20 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span className={`font-bold ${rankStyles[entry.rank] ?? "text-muted-foreground"}`}>
                          {entry.rank <= 3 ? (
                            <Trophy className="inline h-4 w-4 mr-1" />
                          ) : null}
                          #{entry.rank}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {entry.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right text-muted-foreground">
                        {entry.completed}
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-primary">
                        {entry.xp} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}