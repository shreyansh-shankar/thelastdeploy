// web/frontend/app/profile/page.tsx

"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <LoadingSpinner className="py-40" />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 transition-colors duration-300">
      <h1 className="text-3xl font-black mb-2 text-foreground">Profile</h1>
      <p className="text-muted-foreground mb-8">Your account information.</p>
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1 font-semibold">Username</p>
          <p className="font-semibold text-foreground">{user.username}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1 font-semibold">Email</p>
          <p className="font-semibold text-foreground">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1 font-semibold">Total XP</p>
          <p className="font-bold font-mono text-[var(--accent-primary)]">{user.xp} XP</p>
        </div>
      </div>
    </div>
  );
}