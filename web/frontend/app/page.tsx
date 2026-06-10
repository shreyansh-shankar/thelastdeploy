// web/frontend/app/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight, Container, GitBranch, Monitor, Server } from "lucide-react";

const features = [
  {
    icon: Container, title: "Docker",
    description: "From hello-world to multi-stage builds.",
    bg: "var(--topic-docker)", border: "var(--topic-docker-border)", color: "var(--topic-docker-text)",
  },
  {
    icon: Server, title: "Kubernetes",
    description: "Deploy and scale on real clusters.",
    bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", color: "var(--topic-kubernetes-text)",
  },
  {
    icon: Monitor, title: "Linux",
    description: "Permissions, processes, networking.",
    bg: "var(--topic-linux)", border: "var(--topic-linux-border)", color: "var(--topic-linux-text)",
  },
  {
    icon: GitBranch, title: "CI/CD",
    description: "Pipelines, deploys, automation.",
    bg: "var(--topic-cicd)", border: "var(--topic-cicd-border)", color: "var(--topic-cicd-text)",
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  if (loading) return null;
  if (user) return null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-between">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="flex flex-col items-start gap-6 lg:col-span-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[rgba(var(--accent-primary-rgb),0.3)] bg-[rgba(var(--accent-primary-rgb),0.06)] text-[var(--accent-primary)]"
          >
            Open Source · Free Forever
          </span>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
            Learn DevOps
            <br />
            by <span className="neon-text">doing it.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Hands-on challenges for Docker, Kubernetes, Linux, and CI/CD.
            Run labs locally — no cloud account, no credit card, no BS.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link
              href="/modules"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all hover:scale-105 neon-glow text-white dark:text-black"
            >
              Browse Challenges
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-foreground border border-border bg-card hover:bg-muted transition-all"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Terminal */}
        <div className="lg:col-span-2 w-full rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">tld — zsh</span>
          </div>
          <div className="px-6 py-6 space-y-2.5 font-mono text-xs sm:text-sm text-foreground">
            <p><span className="text-[var(--accent-primary)]">❯</span> <span>tld sync</span></p>
            <p className="text-muted-foreground">  ✓ docker-hello</p>
            <p className="text-muted-foreground">  ✓ k8s-first-pod</p>
            <p className="mt-3"><span className="text-[var(--accent-primary)]">❯</span> <span>tld start docker-hello</span></p>
            <p className="text-muted-foreground">  Lab ready. Follow the steps above.</p>
            <p className="mt-3"><span className="text-[var(--accent-primary)]">❯</span> <span>tld check</span></p>
            <p className="font-bold text-[var(--accent-primary)]">  ✅ PASSED — 🎉 +50 XP awarded!</p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20 w-full">
        <h2 className="text-2xl sm:text-3xl font-black mb-8 text-foreground">
          Four tracks. <span className="text-muted-foreground">One platform.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, bg, border, color }) => (
            <div
              key={title}
              className="rounded-2xl p-6 border flex flex-col gap-4 hover:scale-[1.02] transition-all duration-200 shadow-sm"
              style={{ backgroundColor: bg, borderColor: border }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background/50 border border-border/20">
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-12 bg-muted/20 w-full">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-foreground">Ready to start?</h2>
            <p className="text-muted-foreground mt-1">Install the agent and pick your first challenge.</p>
          </div>
          <Link
            href="/modules"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 hover:scale-105 transition-all text-white dark:text-black"
          >
            View all challenges <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}