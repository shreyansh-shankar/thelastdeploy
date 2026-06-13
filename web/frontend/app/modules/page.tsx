// web/frontend/app/modules/page.tsx

"use client";

import { useModules } from "@/hooks/use-modules";
import { ModuleGrid } from "@/components/modules/module-grid";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Container, Server, Monitor, GitBranch, Zap, Infinity, Layers, Globe } from "lucide-react";

const topicStats = [
  { key: "docker",     label: "Docker",     icon: Container, bg: "var(--topic-docker)",     borderColorVar: "var(--topic-docker-border)",     color: "var(--topic-docker-text)" },
  { key: "kubernetes", label: "Kubernetes", icon: Server,    bg: "var(--topic-kubernetes)", borderColorVar: "var(--topic-kubernetes-border)", color: "var(--topic-kubernetes-text)" },
  { key: "linux",      label: "Linux",      icon: Monitor,   bg: "var(--topic-linux)",      borderColorVar: "var(--topic-linux-border)",      color: "var(--topic-linux-text)" },
  { key: "git",        label: "Git",        icon: GitBranch, bg: "var(--topic-git)",        borderColorVar: "var(--topic-git-border)",        color: "var(--topic-git-text)" },
  { key: "jenkins",    label: "Jenkins",    icon: Infinity,  bg: "var(--topic-jenkins)",    borderColorVar: "var(--topic-jenkins-border)",    color: "var(--topic-jenkins-text)" },
  { key: "terraform",  label: "Terraform",  icon: Layers,    bg: "var(--topic-terraform)",  borderColorVar: "var(--topic-terraform-border)",  color: "var(--topic-terraform-text)" },
  { key: "nginx",      label: "Nginx",      icon: Globe,     bg: "var(--topic-nginx)",      borderColorVar: "var(--topic-nginx-border)",      color: "var(--topic-nginx-text)" },
];

export default function ModulesPage() {
  const { modules, loading, error } = useModules();
  const countByTopic = (t: string) => modules.filter((m) => m.topic === t).length;

  return (
    <div>
      <div className="border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">Modules</h1>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Structured learning paths combining theory and hands-on practice.
                No account needed to browse.
              </p>
            </div>
            {!loading && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card shadow-sm">
                <Zap className="h-4 w-4 text-[var(--accent-primary)]" />
                <span className="font-mono font-bold text-sm text-[var(--accent-primary)]">
                  {modules.length}
                </span>
                <span className="text-muted-foreground text-sm">modules available</span>
              </div>
            )}
          </div>

          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8 max-w-4xl">
              {topicStats.map(({ key, label, icon: Icon, bg, borderColorVar, color }) => (
                <div
                  key={key}
                  className="rounded-2xl border p-6 flex flex-col items-center justify-center text-center gap-3 aspect-square shadow-sm hover:scale-[1.02] transition-transform duration-200"
                  style={{ backgroundColor: bg, borderColor: borderColorVar }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-background/50 border border-border/10">
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold font-mono tracking-wide uppercase" style={{ color }}>{label}</p>
                    <p className="text-3xl font-black text-foreground mt-1">{countByTopic(key)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && <div className="text-center py-20 text-red-400 text-sm">{error}</div>}
        {!loading && !error && <ModuleGrid modules={modules} />}
      </div>
    </div>
  );
}