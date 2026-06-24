export const LAUNCH_DATE = new Date("2026-08-08T00:00:00Z");

export const SITE_URL = "https://thelastdeploy.dev";

export const SOCIAL_LINKS = {
  github: "https://github.com/thelastdeploy/platform",
  discord: "https://discord.gg/placeholder", // TODO: replace with real Discord invite
} as const;

export const TRACKS = [
  {
    name: "Linux",
    description: "Filesystem, processes, permissions, shell scripting, and system administration.",
    color: "orange",
    status: "available" as const,
  },
  {
    name: "Git",
    description: "Branching, rebasing, merge conflicts, hooks, and collaborative workflows.",
    color: "red",
    status: "available" as const,
  },
  {
    name: "Docker",
    description: "Containers, images, Dockerfiles, volumes, networking, and Compose.",
    color: "green",
    status: "available" as const,
  },
  {
    name: "Kubernetes",
    description: "Pods, deployments, services, ingress, Helm, and cluster operations.",
    color: "purple",
    status: "available" as const,
  },
  {
    name: "Terraform",
    description: "Infrastructure as code, state management, modules, and providers.",
    color: "cyan",
    status: "coming-soon" as const,
  },
  {
    name: "Nginx",
    description: "Reverse proxy, load balancing, SSL termination, and performance tuning.",
    color: "green",
    status: "coming-soon" as const,
  },
] as const;

export const TRACK_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: "bg-green-950/30", border: "border-green-900/50", text: "text-green-400" },
  purple: { bg: "bg-purple-950/30", border: "border-purple-900/50", text: "text-purple-400" },
  orange: { bg: "bg-orange-950/30", border: "border-orange-900/50", text: "text-orange-400" },
  red: { bg: "bg-red-950/30", border: "border-red-900/50", text: "text-red-400" },
  cyan: { bg: "bg-cyan-950/30", border: "border-cyan-900/50", text: "text-cyan-400" },
};
