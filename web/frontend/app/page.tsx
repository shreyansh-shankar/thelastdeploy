// web/frontend/app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Container, Server, GitBranch, Monitor, ArrowRight, Zap, Users, Trophy } from "lucide-react";

const features = [
  {
    icon: Container,
    title: "Docker",
    description: "Master containerization from hello-world to multi-stage builds.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Server,
    title: "Kubernetes",
    description: "Deploy, scale, and manage workloads on real clusters.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Monitor,
    title: "Linux",
    description: "File systems, permissions, processes, networking — all hands-on.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    description: "Build pipelines, automate deployments, ship with confidence.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const stats = [
  { icon: Zap, label: "Challenges", value: "50+" },
  { icon: Users, label: "Learners", value: "Open Source" },
  { icon: Trophy, label: "Free Forever", value: "100%" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-28 flex flex-col items-center text-center gap-6">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-3 py-1">
            Open Source · Free Forever
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
            Learn DevOps by{" "}
            <span className="text-primary">actually doing it</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Hands-on challenges for Docker, Kubernetes, Linux, and CI/CD.
            Run labs locally with the OrbStack agent — no cloud required.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button size="lg" asChild>
              <Link href="/challenges">
                Browse Challenges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Terminal className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Terminal snippet */}
          <div className="mt-6 w-full max-w-lg rounded-lg border border-border/50 bg-black/60 backdrop-blur text-left font-mono text-sm overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40 bg-white/5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-muted-foreground">terminal</span>
            </div>
            <div className="px-4 py-4 space-y-1.5 text-xs">
              <p><span className="text-primary">$</span> <span className="text-foreground">orbstack sync</span></p>
              <p className="text-muted-foreground">  ✓ docker-hello</p>
              <p className="text-muted-foreground">  ✓ k8s-first-pod</p>
              <p><span className="text-primary">$</span> <span className="text-foreground">orbstack start docker-hello</span></p>
              <p className="text-muted-foreground">  Lab ready. Follow the steps above.</p>
              <p><span className="text-primary">$</span> <span className="text-foreground">orbstack check</span></p>
              <p className="text-emerald-400">  ✅ PASSED — 🎉 +50 XP awarded!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <Icon className="h-5 w-5 text-primary mb-1" />
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Four tracks, one platform</h2>
          <p className="mt-3 text-muted-foreground">
            Every challenge runs locally on your machine — no cloud bills, no waiting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="group rounded-xl border border-border/50 bg-card/30 p-6 hover:border-border hover:bg-card/60 transition-all duration-200"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-4`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to start learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Install the agent, pick a challenge, and start building real skills today.
          </p>
          <Button size="lg" asChild>
            <Link href="/challenges">
              View all challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}