// web/frontend/lib/ranks.ts

export interface Rank {
  id: string;
  label: string;
  minXp: number;
  maxXp: number;
  color: string;
  description: string;
}

export const RANKS: Rank[] = [
  {
    id: "newcomer",
    label: "Newcomer",
    minXp: 0,
    maxXp: 99,
    color: "#888888",
    description: "Just getting started",
  },
  {
    id: "container-cadet",
    label: "Container Cadet",
    minXp: 100,
    maxXp: 299,
    color: "#7eb8ff",
    description: "Running your first containers",
  },
  {
    id: "shell-scout",
    label: "Shell Scout",
    minXp: 300,
    maxXp: 599,
    color: "#ffaa5e",
    description: "Comfortable in the terminal",
  },
  {
    id: "pipeline-pilot",
    label: "Pipeline Pilot",
    minXp: 600,
    maxXp: 999,
    color: "#5edfff",
    description: "Building and shipping pipelines",
  },
  {
    id: "cluster-commander",
    label: "Cluster Commander",
    minXp: 1000,
    maxXp: 1799,
    color: "#b87eff",
    description: "Orchestrating at scale",
  },
  {
    id: "infra-architect",
    label: "Infra Architect",
    minXp: 1800,
    maxXp: 2999,
    color: "#ff6b6b",
    description: "Designing production systems",
  },
  {
    id: "devops-sage",
    label: "DevOps Sage",
    minXp: 3000,
    maxXp: Infinity,
    color: "#cbff5e",
    description: "Mastery across the full stack",
  },
];

// Total sections across all modules — increment as content grows
export const TOTAL_SECTIONS = 3; // docker-fundamentals has 3 sections

export function getRank(xp: number): Rank {
  return [...RANKS].reverse().find((r) => xp >= r.minXp) ?? RANKS[0];
}

export function getNextRank(xp: number): Rank | null {
  const current = getRank(xp);
  const idx = RANKS.findIndex((r) => r.id === current.id);
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}

export function getXpProgress(xp: number): { current: number; needed: number; pct: number } {
  const rank = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return { current: xp - rank.minXp, needed: 0, pct: 100 };
  const current = xp - rank.minXp;
  const needed = next.minXp - rank.minXp;
  return { current, needed, pct: Math.round((current / needed) * 100) };
}