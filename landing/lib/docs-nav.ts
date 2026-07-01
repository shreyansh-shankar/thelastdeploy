export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavSection {
  id: string;
  title: string;
  icon: string; // SVG path data
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    items: [
      { title: "Welcome", href: "/introduction/welcome", description: "What is The Last Deploy?" },
      { title: "Why TLD Exists", href: "/introduction/why-tld", description: "The problem we're solving" },
      { title: "Vision", href: "/introduction/vision", description: "Where we're headed" },
      { title: "Philosophy", href: "/introduction/philosophy", description: "Our core principles" },
      { title: "FAQ", href: "/introduction/faq", description: "Common questions answered" },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    items: [
      { title: "Installation", href: "/getting-started/installation", description: "Install the TLD CLI" },
      { title: "Quick Start", href: "/getting-started/quick-start", description: "Zero to first lab in 5 minutes" },
      { title: "Your First Lab", href: "/getting-started/first-lab", description: "Full walkthrough" },
      { title: "Updating", href: "/getting-started/updating", description: "Keep TLD up to date" },
      { title: "Troubleshooting", href: "/getting-started/troubleshooting", description: "Common issues and fixes" },
    ],
  },
  {
    id: "labs",
    title: "Labs",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    items: [
      { title: "Overview", href: "/labs/overview", description: "How labs work" },
      { title: "Learning Paths", href: "/labs/learning-paths", description: "Guided tracks" },
      { title: "Beginner Labs", href: "/labs/beginner", description: "Start here" },
      { title: "Intermediate Labs", href: "/labs/intermediate", description: "Level up" },
      { title: "Advanced Labs", href: "/labs/advanced", description: "Production-grade challenges" },
      { title: "Upcoming Labs", href: "/labs/upcoming", description: "What's coming next" },
    ],
  },
  {
    id: "cli",
    title: "CLI",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    items: [
      { title: "Overview", href: "/cli/overview", description: "CLI introduction" },
      { title: "tld login", href: "/cli/commands/login", description: "Authenticate with TLD" },
      { title: "tld logout", href: "/cli/commands/logout", description: "Sign out" },
      { title: "tld lab", href: "/cli/commands/lab", description: "Start, stop, list labs" },
      { title: "tld check", href: "/cli/commands/check", description: "Validate your solution" },
      { title: "tld doctor", href: "/cli/commands/doctor", description: "Diagnose your environment" },
      { title: "tld update", href: "/cli/commands/update", description: "Update the CLI" },
      { title: "tld version", href: "/cli/commands/version", description: "Show version info" },
      { title: "tld config", href: "/cli/commands/config", description: "Manage configuration" },
      { title: "Configuration", href: "/cli/configuration", description: "Config file reference" },
      { title: "Authentication", href: "/cli/authentication", description: "Auth flow and tokens" },
      { title: "Examples", href: "/cli/examples", description: "Real-world usage patterns" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    items: [
      { title: "Overview", href: "/architecture/overview", description: "System architecture" },
      { title: "Monorepo", href: "/architecture/monorepo", description: "Folder structure" },
      { title: "Backend", href: "/architecture/backend", description: "FastAPI + PostgreSQL" },
      { title: "Frontend", href: "/architecture/frontend", description: "Next.js dashboard" },
      { title: "CLI", href: "/architecture/cli", description: "Go-based agent" },
      { title: "Lab Engine", href: "/architecture/lab-engine", description: "How labs run" },
      { title: "Database", href: "/architecture/database", description: "Schema overview" },
    ],
  },
  {
    id: "contributing",
    title: "Contributing",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    items: [
      { title: "Development Setup", href: "/contributing/setup", description: "Get your environment ready" },
      { title: "Good First Issues", href: "/contributing/good-first-issues", description: "Start contributing" },
      { title: "Coding Standards", href: "/contributing/coding-standards", description: "Style and conventions" },
      { title: "Pull Requests", href: "/contributing/pull-requests", description: "PR process" },
      { title: "Code of Conduct", href: "/contributing/code-of-conduct", description: "Community standards" },
      { title: "Security Policy", href: "/contributing/security", description: "Responsible disclosure" },
    ],
  },
  {
    id: "community",
    title: "Community",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    items: [
      { title: "Discord", href: "/community/discord", description: "Join the conversation" },
      { title: "GitHub", href: "/community/github", description: "Star, fork, contribute" },
      { title: "Roadmap", href: "/community/roadmap", description: "What's coming" },
      { title: "Changelog", href: "/community/changelog", description: "What changed" },
      { title: "Sponsors", href: "/community/sponsors", description: "Support TLD" },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    items: [
      { title: "API Reference", href: "/reference/api", description: "REST API endpoints" },
      { title: "Configuration", href: "/reference/configuration", description: "Config file schema" },
      { title: "Environment Variables", href: "/reference/env-vars", description: "All env vars" },
      { title: "Exit Codes", href: "/reference/exit-codes", description: "CLI exit codes" },
      { title: "Glossary", href: "/reference/glossary", description: "Key terms defined" },
    ],
  },
  {
    id: "learn",
    title: "Learn",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    items: [
      { title: "DevOps Fundamentals", href: "/learn/devops-fundamentals", description: "What is DevOps?" },
      { title: "Docker Concepts", href: "/learn/docker-concepts", description: "Containers explained" },
      { title: "Linux Basics", href: "/learn/linux-basics", description: "Essential Linux knowledge" },
      { title: "Kubernetes Explained", href: "/learn/kubernetes-explained", description: "Orchestration concepts" },
      { title: "Networking Essentials", href: "/learn/networking-essentials", description: "DNS, HTTP, TCP/IP" },
      { title: "CI/CD Concepts", href: "/learn/cicd-concepts", description: "Pipelines and automation" },
    ],
  },
];

// Flat list of all nav items for search indexing and prev/next navigation
export const ALL_NAV_ITEMS: (NavItem & { section: string; sectionId: string })[] =
  NAV_SECTIONS.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
      sectionId: section.id,
    }))
  );

export function getNavItem(slug: string[]): (NavItem & { section: string; sectionId: string }) | undefined {
  const href = "/" + slug.join("/");
  return ALL_NAV_ITEMS.find((item) => item.href === href);
}

export function getPrevNext(slug: string[]): {
  prev: (NavItem & { section: string }) | null;
  next: (NavItem & { section: string }) | null;
} {
  const href = "/" + slug.join("/");
  const idx = ALL_NAV_ITEMS.findIndex((item) => item.href === href);
  return {
    prev: idx > 0 ? ALL_NAV_ITEMS[idx - 1] : null,
    next: idx < ALL_NAV_ITEMS.length - 1 ? ALL_NAV_ITEMS[idx + 1] : null,
  };
}
