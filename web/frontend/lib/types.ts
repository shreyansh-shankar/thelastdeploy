// web/frontend/lib/types.ts

export interface ChallengeRaw {
  id: string;
  yaml: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  difficulty: Difficulty;
  xp: number;
  estimated_minutes: number;
  completed: boolean;
}

export type Topic = "docker" | "kubernetes" | "linux" | "cicd";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface User {
  id: number;
  username: string;
  email: string;
  xp: number;
  streak_days: number;
  completed_challenges: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  completed: number;
}