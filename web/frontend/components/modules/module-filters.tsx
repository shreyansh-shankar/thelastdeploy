// web/frontend/components/modules/module-filters.tsx

"use client";

import { Search, X, Container, Server, Monitor, GitBranch, Sparkles, Zap, Flame, Gem, Infinity, Layers, Globe } from "lucide-react";
import { Difficulty, Topic } from "@/lib/types";

const TOPICS: { key: "all" | Topic; label: string; icon: typeof Container }[] = [
  { key: "all", label: "All Topics", icon: Sparkles },
  { key: "docker", label: "Docker", icon: Container },
  { key: "kubernetes", label: "Kubernetes", icon: Server },
  { key: "linux", label: "Linux", icon: Monitor },
  { key: "git", label: "Git", icon: GitBranch },
  { key: "jenkins", label: "Jenkins", icon: Infinity },
  { key: "terraform", label: "Terraform", icon: Layers },
  { key: "nginx", label: "Nginx", icon: Globe },
];

const DIFFICULTIES: { key: "all" | Difficulty; label: string; icon: typeof Zap; color: string }[] = [
  { key: "all", label: "All Levels", icon: Sparkles, color: "var(--muted-foreground)" },
  { key: "beginner", label: "Beginner", icon: Zap, color: "var(--accent-primary)" },
  { key: "intermediate", label: "Intermediate", icon: Flame, color: "#fbbf24" },
  { key: "advanced", label: "Advanced", icon: Gem, color: "#ff4444" },
];

const topicStyles: Record<string, { bg: string; border: string; text: string }> = {
  docker:     { bg: "var(--topic-docker)",     border: "var(--topic-docker-border)",     text: "var(--topic-docker-text)" },
  kubernetes: { bg: "var(--topic-kubernetes)", border: "var(--topic-kubernetes-border)", text: "var(--topic-kubernetes-text)" },
  linux:      { bg: "var(--topic-linux)",      border: "var(--topic-linux-border)",      text: "var(--topic-linux-text)" },
  git:        { bg: "var(--topic-git)",        border: "var(--topic-git-border)",        text: "var(--topic-git-text)" },
  jenkins:    { bg: "var(--topic-jenkins)",    border: "var(--topic-jenkins-border)",    text: "var(--topic-jenkins-text)" },
  terraform:  { bg: "var(--topic-terraform)",  border: "var(--topic-terraform-border)",  text: "var(--topic-terraform-text)" },
  nginx:      { bg: "var(--topic-nginx)",      border: "var(--topic-nginx-border)",      text: "var(--topic-nginx-text)" },
};

interface ModuleFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTopic: "all" | Topic;
  onTopicChange: (t: "all" | Topic) => void;
  selectedDifficulty: "all" | Difficulty;
  onDifficultyChange: (d: "all" | Difficulty) => void;
  resultCount: number;
  totalCount: number;
}

export function ModuleFilters({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  selectedDifficulty,
  onDifficultyChange,
  resultCount,
  totalCount,
}: ModuleFiltersProps) {
  const activeCount = (selectedTopic !== "all" ? 1 : 0) + (selectedDifficulty !== "all" ? 1 : 0) + (searchQuery ? 1 : 0);

  const handleClear = () => {
    onSearchChange("");
    onTopicChange("all");
    onDifficultyChange("all");
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search modules..."
          className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:border-[var(--accent-primary)] focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-primary-rgb),0.15)] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Topic filters */}
      <div className="flex flex-wrap gap-2">
        {TOPICS.map(({ key, label, icon: Icon }) => {
          const isActive = selectedTopic === key;
          const isAll = key === "all";
          const style = isAll ? null : topicStyles[key];

          return (
            <button
              key={key}
              onClick={() => onTopicChange(key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                isActive
                  ? isAll
                    ? "bg-[var(--accent-primary)] text-white dark:text-black border-[var(--accent-primary)] shadow-sm shadow-[rgba(var(--accent-primary-rgb),0.2)]"
                    : "text-foreground shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
              style={isActive && !isAll ? { backgroundColor: style!.bg, borderColor: style!.border, color: style!.text } : {}}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Difficulty filters */}
      <div className="flex flex-wrap gap-2">
        {DIFFICULTIES.map(({ key, label, icon: Icon, color }) => {
          const isActive = selectedDifficulty === key;
          return (
            <button
              key={key}
              onClick={() => onDifficultyChange(key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-card shadow-sm border-foreground/20"
                  : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
              style={isActive ? { color, borderColor: `${color}40` } : {}}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span>
          {" "}module{resultCount !== 1 ? "s" : ""} found
          {activeCount > 0 && (
            <span className="text-muted-foreground/60 ml-1">
              ({activeCount} active filter{activeCount !== 1 ? "s" : ""})
            </span>
          )}
        </p>
        {activeCount > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
