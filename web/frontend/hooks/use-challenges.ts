// web/frontend/hooks/use-challenges.ts

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Challenge } from "@/lib/types";
import yaml from "js-yaml";

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getChallenges()
      .then(({ challenges: raw }) => {
        const parsed = raw.map((c) => {
          const data = yaml.load(c.yaml) as Record<string, unknown>;
          return {
            id: c.id,
            title: data.title as string,
            description: data.description as string,
            topic: data.topic as Challenge["topic"],
            difficulty: data.difficulty as Challenge["difficulty"],
            xp: data.xp as number,
            estimated_minutes: data.estimated_minutes as number,
            completed: false,
          };
        });
        setChallenges(parsed);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { challenges, loading, error };
}