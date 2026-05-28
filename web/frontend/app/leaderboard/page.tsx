// web/frontend/app/leaderboard/page.tsx

"use client";

import { useLeaderboard } from "@/hooks/use-leaderboard";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRank, RANKS } from "@/lib/ranks";
import { Trophy, Zap, CheckCircle2 } from "lucide-react";

const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

export default function LeaderboardPage() {
  const { leaderboard, loading, error } = useLeaderboard();

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div>
      {/* Header */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-[#888]">Top DevOps engineers ranked by XP earned.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && <div className="text-center py-20 text-red-400 text-sm">{error}</div>}

        {!loading && !error && (
          <>
            {/* Rank legend */}
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-5 mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#555] mb-4">Rank System</h2>
              <div className="flex flex-wrap gap-2">
                {RANKS.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold"
                    style={{ color: r.color, borderColor: `${r.color}30`, backgroundColor: `${r.color}10` }}
                  >
                    {r.label}
                    <span className="text-[10px] opacity-60 font-mono">{r.minXp}+ XP</span>
                  </div>
                ))}
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] text-center py-20">
                <p className="text-[#555] text-sm">No entries yet. Complete a challenge to appear here!</p>
              </div>
            ) : (
              <>
                {/* Top 3 podium */}
                {top3.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {top3.map((entry) => {
                      const rank = getRank(entry.xp);
                      const podiumColor = podiumColors[entry.rank - 1];
                      return (
                        <div
                          key={entry.rank}
                          className="rounded-2xl border p-6 flex flex-col items-center gap-3 text-center"
                          style={{
                            borderColor: `${podiumColor}40`,
                            background: `linear-gradient(135deg, ${podiumColor}08 0%, transparent 60%)`,
                            backgroundColor: "#0d0d0d",
                          }}
                        >
                          <Trophy className="h-6 w-6" style={{ color: podiumColor }} />
                          <Avatar className="h-14 w-14 border-2" style={{ borderColor: podiumColor }}>
                            <AvatarFallback
                              className="text-lg font-black"
                              style={{ backgroundColor: `${podiumColor}20`, color: podiumColor }}
                            >
                              {entry.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-black text-white">{entry.username}</p>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full border"
                              style={{ color: rank.color, borderColor: `${rank.color}40`, backgroundColor: `${rank.color}15` }}
                            >
                              {rank.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm mt-1">
                            <span className="flex items-center gap-1 font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                              <Zap className="h-3.5 w-3.5" />
                              {entry.xp}
                            </span>
                            <span className="flex items-center gap-1 text-[#555]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {entry.completed}
                            </span>
                          </div>
                          <div
                            className="text-2xl font-black"
                            style={{ color: podiumColor }}
                          >
                            #{entry.rank}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Rest of leaderboard */}
                {rest.length > 0 && (
                  <div className="rounded-2xl border border-[#2a2a2a] overflow-hidden bg-[#0d0d0d]">
                    <table className="w-full text-sm">
                      <thead className="border-b border-[#1a1a1a] bg-[#111]">
                        <tr>
                          <th className="text-left px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">Rank</th>
                          <th className="text-left px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">User</th>
                          <th className="text-left px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest hidden sm:table-cell">Level</th>
                          <th className="text-right px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">Completed</th>
                          <th className="text-right px-6 py-4 text-[#555] font-semibold uppercase text-xs tracking-widest">XP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rest.map((entry) => {
                          const rank = getRank(entry.xp);
                          return (
                            <tr
                              key={entry.rank}
                              className="border-b border-[#111] last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="px-6 py-4">
                                <span className="font-black font-mono text-[#555]">#{entry.rank}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback
                                      className="text-xs font-bold"
                                      style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
                                    >
                                      {entry.username.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-semibold">{entry.username}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden sm:table-cell">
                                <span
                                  className="text-xs font-bold px-2 py-0.5 rounded-full border"
                                  style={{ color: rank.color, borderColor: `${rank.color}40`, backgroundColor: `${rank.color}15` }}
                                >
                                  {rank.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right text-[#666] font-mono">{entry.completed}</td>
                              <td className="px-6 py-4 text-right font-mono font-black" style={{ color: "var(--accent-primary)" }}>
                                {entry.xp} XP
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}