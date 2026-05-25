// web/frontend/app/leaderboard/page.tsx

"use client";

import { useLeaderboard } from "@/hooks/use-leaderboard";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const rankStyle = (rank: number) => {
  if (rank === 1) return { color: "#FFD700" };
  if (rank === 2) return { color: "#C0C0C0" };
  if (rank === 3) return { color: "#CD7F32" };
  return { color: "#555" };
};

export default function LeaderboardPage() {
  const { leaderboard, loading, error } = useLeaderboard();

  return (
    <div>
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-[#888]">Top learners ranked by XP.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && <div className="text-center py-20 text-red-400 text-sm">{error}</div>}
        {!loading && !error && (
          <div className="rounded-2xl border border-[#2a2a2a] overflow-hidden bg-[#0d0d0d]">
            {leaderboard.length === 0 ? (
              <div className="text-center py-20 text-[#555] text-sm">
                No entries yet. Complete a challenge to appear here!
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="border-b border-[#1a1a1a] bg-[#111]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">Rank</th>
                    <th className="text-left px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">User</th>
                    <th className="text-right px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">Challenges</th>
                    <th className="text-right px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr
                      key={entry.rank}
                      className="border-b border-[#111] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-black font-mono flex items-center gap-1.5" style={rankStyle(entry.rank)}>
                          {entry.rank <= 3 && <Trophy className="h-3.5 w-3.5" />}
                          {entry.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback
                              className="text-xs font-bold"
                              style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.15)", color: "var(--accent-primary)" }}
                            >
                              {entry.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-[#666] font-mono">
                        {entry.completed}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-black" style={{ color: "var(--accent-primary)" }}>
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