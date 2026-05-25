// web/frontend/app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Zap, Flame, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <LoadingSpinner className="py-40" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10 pb-10 border-b border-[#1a1a1a]">
        <Avatar className="h-16 w-16">
          <AvatarFallback
            className="text-xl font-black"
            style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.15)", color: "var(--accent-primary)" }}
          >
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-black">{user.username}</h1>
          <p className="text-[#555] text-sm mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {/* XP */}
        <div
          className="rounded-2xl p-6 border flex flex-col gap-3"
          style={{ backgroundColor: "rgba(var(--accent-primary-rgb), 0.06)", borderColor: "rgba(var(--accent-primary-rgb), 0.2)" }}
        >
          <Zap className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
          <div>
            <p className="text-3xl font-black font-mono" style={{ color: "var(--accent-primary)" }}>
              {user.xp}
            </p>
            <p className="text-sm text-[#666] mt-0.5">Total XP</p>
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-2xl p-6 border border-[#2a1a0e] flex flex-col gap-3" style={{ backgroundColor: "var(--topic-linux)" }}>
          <Flame className="h-5 w-5" style={{ color: "var(--topic-linux-text)" }} />
          <div>
            <p className="text-3xl font-black font-mono" style={{ color: "var(--topic-linux-text)" }}>
              {user.streak_days}
            </p>
            <p className="text-sm text-[#666] mt-0.5">Day Streak</p>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl p-6 border border-[#1e1535] flex flex-col gap-3" style={{ backgroundColor: "var(--topic-kubernetes)" }}>
          <CheckCircle2 className="h-5 w-5" style={{ color: "var(--topic-kubernetes-text)" }} />
          <div>
            <p className="text-3xl font-black font-mono" style={{ color: "var(--topic-kubernetes-text)" }}>
              {user.completed_challenges.length}
            </p>
            <p className="text-sm text-[#666] mt-0.5">Completed</p>
          </div>
        </div>
      </div>

      {/* Completed challenges */}
      <div>
        <h2 className="text-xl font-black mb-5">Completed Challenges</h2>
        {user.completed_challenges.length === 0 ? (
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-12 text-center">
            <Terminal className="h-8 w-8 text-[#333] mx-auto mb-3" />
            <p className="text-[#555] text-sm">No challenges completed yet.</p>
            <Link
              href="/challenges"
              className="text-sm font-semibold mt-2 inline-block hover:opacity-80 transition-opacity"
              style={{ color: "var(--accent-primary)" }}
            >
              Browse challenges →
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.completed_challenges.map((id) => (
              <Link key={id} href={`/challenges/${id}`}>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all hover:scale-105"
                  style={{
                    backgroundColor: "rgba(var(--accent-primary-rgb), 0.08)",
                    borderColor: "rgba(var(--accent-primary-rgb), 0.2)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {id}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}