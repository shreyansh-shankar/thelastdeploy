// web/frontend/hooks/use-leaderboard.ts

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LeaderboardEntry } from "@/lib/types";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getLeaderboard()
      .then(({ leaderboard }) => setLeaderboard(leaderboard))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { leaderboard, loading, error };
}