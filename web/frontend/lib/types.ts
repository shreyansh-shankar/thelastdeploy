// web/frontend/lib/types.ts

export type Topic = "docker" | "kubernetes" | "linux" | "cicd";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lab {
  id: string;
  title: string;
  order: number;
  xp: number;
  estimated_minutes: number | null;
  setup_type: string | null;
  seed_commands: string | null;
  resource_limits_cpu: number | null;
  resource_limits_mem: number | null;
  completed: boolean;
  xp_awarded: number;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  xp: number;                  // reading XP from section.yaml
  content: string | null;
  labs: Lab[];
  section_completed: boolean;  // true = reading scrolled to end (or future: questions done)
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
  completed_labs: string[];      // lab IDs (tld check)
  completed_sections: string[];  // section IDs (reading / future: questions)
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  completed: number;
}