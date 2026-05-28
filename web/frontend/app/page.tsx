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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--accent-primary)",
              borderColor: "rgba(var(--accent-primary-rgb), 0.3)",
              backgroundColor: "rgba(var(--accent-primary-rgb), 0.08)",
            }}
          >
            Open Source · Free Forever
          </span>

          <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-[1.05]">
            Learn DevOps
            <br />
            by{" "}
            <span style={{ color: "var(--accent-primary)" }} className="neon-text">
              doing it.
            </span>
          </h1>

          <p className="text-lg text-[#888] leading-relaxed max-w-lg">
            Hands-on challenges for Docker, Kubernetes, Linux, and CI/CD.
            Run labs locally — no cloud account, no credit card, no BS.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <Link
              href="/challenges"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "var(--accent-primary)",
                boxShadow: "0 0 24px rgba(var(--accent-primary-rgb), 0.3)",
              }}
            >
              Browse Challenges
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[#aaa] border border-[#2a2a2a] bg-[#111] hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-16 max-w-lg rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1a1a1a] bg-[#111]">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#555] font-mono">orbstack — zsh</span>
          </div>
          <div className="px-5 py-5 space-y-2 font-mono text-sm">
            <p><span style={{ color: "var(--accent-primary)" }}>❯</span> <span className="text-white">orbstack sync</span></p>
            <p className="text-[#555]">  ✓ docker-hello</p>
            <p className="text-[#555]">  ✓ k8s-first-pod</p>
            <p className="mt-3"><span style={{ color: "var(--accent-primary)" }}>❯</span> <span className="text-white">orbstack start docker-hello</span></p>
            <p className="text-[#555]">  Lab ready. Follow the steps above.</p>
            <p className="mt-3"><span style={{ color: "var(--accent-primary)" }}>❯</span> <span className="text-white">orbstack check</span></p>
            <p style={{ color: "var(--accent-primary)" }} className="font-semibold">  ✅ PASSED — 🎉 +50 XP awarded!</p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-black mb-8">Four tracks. <span className="text-[#555]">One platform.</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description, bg, border, color }) => (
            <div
              key={title}
              className="rounded-2xl p-6 border flex flex-col gap-4 hover:scale-[1.02] transition-all duration-200"
              style={{ backgroundColor: bg, borderColor: border }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{title}</h3>
                <p className="text-sm text-[#999] mt-1 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-b border-[#1a1a1a] py-16" style={{ backgroundColor: "rgba(var(--accent-primary-rgb), 0.04)" }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black">Ready to start?</h2>
            <p className="text-[#888] mt-1">Install the agent and pick your first challenge.</p>
          </div>
          <Link
            href="/challenges"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black shrink-0 hover:scale-105 transition-all"
            style={{ backgroundColor: "var(--accent-primary)", boxShadow: "0 0 24px rgba(var(--accent-primary-rgb), 0.25)" }}
          >
            View all challenges <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}