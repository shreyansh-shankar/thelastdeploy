// web/frontend/app/settings/page.tsx

"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <LoadingSpinner className="py-40" />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 transition-colors duration-300">
      <h1 className="text-3xl font-black mb-2 text-foreground">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your account preferences.</p>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-muted-foreground text-sm">More settings coming soon.</p>
      </div>
    </div>
  );
}