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
    maxXp: 199,
    color: "#888888",
    description: "Just getting started",
  },
  {
    id: "terminal-cadet",
    label: "Terminal Cadet",
    minXp: 200,
    maxXp: 499,
    color: "#a8a8a8",
    description: "Navigating files and directory structures",
  },
  {
    id: "shell-scout",
    label: "Shell Scout",
    minXp: 500,
    maxXp: 899,
    color: "#ffaa5e",
    description: "Comfortable in the shell and parsing logs",
  },
  {
    id: "sysadmin-apprentice",
    label: "Sysadmin Apprentice",
    minXp: 900,
    maxXp: 1499,
    color: "#e2bb3c",
    description: "Managing users, permissions, and environments",
  },
  {
    id: "process-commander",
    label: "Process Commander",
    minXp: 1500,
    maxXp: 2199,
    color: "#5effa6",
    description: "Controlling services and daemon lifecycles",
  },
  {
    id: "network-navigator",
    label: "Network Navigator",
    minXp: 2200,
    maxXp: 2999,
    color: "#3cd070",
    description: "Troubleshooting local sockets and interfaces",
  },
  {
    id: "container-cadet",
    label: "Container Cadet",
    minXp: 3000,
    maxXp: 3999,
    color: "#7eb8ff",
    description: "Packaging and running isolated container runtimes",
  },
  {
    id: "pipeline-pilot",
    label: "Pipeline Pilot",
    minXp: 4000,
    maxXp: 5199,
    color: "#5edfff",
    description: "Automating builds, testing, and deployments",
  },
  {
    id: "cluster-commander",
    label: "Cluster Commander",
    minXp: 5200,
    maxXp: 6499,
    color: "#b87eff",
    description: "Orchestrating microservices at scale",
  },
  {
    id: "infra-architect",
    label: "Infra Architect",
    minXp: 6500,
    maxXp: 7999,
    color: "#ff6b6b",
    description: "Designing distributed resilient systems",
  },
  {
    id: "devops-sage",
    label: "DevOps Sage",
    minXp: 8000,
    maxXp: 9999,
    color: "#cbff5e",
    description: "Mastering automation and developer velocity",
  },
  {
    id: "sre-legend",
    label: "Site Reliability Legend",
    minXp: 10000,
    maxXp: Infinity,
    color: "#ff5ee2",
    description: "Unrivaled guardian of uptime and performance",
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