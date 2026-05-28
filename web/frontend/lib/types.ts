// web/frontend/lib/types.ts

export type Topic = "docker" | "kubernetes" | "linux" | "cicd";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type SectionType = "reading" | "practical";

export interface Section {
  id: string;
  title: string;
  type: SectionType;
  order: number;
  xp: number;
  content: string | null;
  completed: boolean;
  xp_awarded: number;
}

export interface Module {
  id: string;
  title: string;
  description: string | null;
  topic: Topic;
  difficulty: Difficulty;
  estimated_minutes: number | null;
  tags: string[];
  total_xp: number;
  total_sections: number;
  completed_sections: number;
}

export interface ModuleDetail extends Module {
  sections: Section[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  xp: number;
  streak_days: number;
  completed_sections: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  completed: number;
}