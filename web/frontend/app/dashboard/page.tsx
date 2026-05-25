// web/frontend/app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-border/50 bg-card/30 p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{user.xp}</p>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/30 p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-orange-500/10">
            <Flame className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{user.streak_days}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/30 p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{user.completed_challenges.length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>

      {/* Completed challenges */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Completed Challenges</h2>
        {user.completed_challenges.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card/20 p-10 text-center">
            <Terminal className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No challenges completed yet.</p>
            <Link href="/challenges" className="text-primary text-sm hover:underline mt-1 inline-block">
              Browse challenges →
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.completed_challenges.map((id) => (
              <Link key={id} href={`/challenges/${id}`}>
                <Badge
                  variant="outline"
                  className="font-mono text-xs bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {id}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}