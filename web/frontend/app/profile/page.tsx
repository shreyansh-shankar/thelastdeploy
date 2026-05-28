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
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-2">Profile</h1>
      <p className="text-[#555] mb-8">Your public profile information.</p>
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] p-6 space-y-4">
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Username</p>
          <p className="font-semibold">{user.username}</p>
        </div>
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Total XP</p>
          <p className="font-semibold font-mono" style={{ color: "var(--accent-primary)" }}>{user.xp} XP</p>
        </div>
      </div>
    </div>
  );
}