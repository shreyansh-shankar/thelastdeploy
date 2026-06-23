// web/frontend/app/cli/verify/page.tsx

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CliVerifyContent() {
  const { user, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const codeFromUrl = searchParams.get("code") || "";
  const [userCode, setUserCode] = useState(codeFromUrl);
  const [status, setStatus] = useState<"idle" | "authorizing" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      const currentQuery = typeof window !== "undefined" ? window.location.search : "";
      const redirectTarget = `/login?redirect=${encodeURIComponent("/cli/verify" + currentQuery)}`;
      router.push(redirectTarget);
    }
  }, [user, loading, router]);

  // Pre-fill userCode if code changes in URL
  useEffect(() => {
    if (codeFromUrl) {
      setUserCode(codeFromUrl);
    }
  }, [codeFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCode.trim()) return;

    setStatus("authorizing");
    setMessage(null);

    try {
      const res = await api.cliAuthorize(userCode);
      setStatus("success");
      setMessage(res.detail);
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to authorize CLI");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Preparing CLI verification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[var(--accent-primary)] mx-auto">
            <span className="text-black font-black text-xl">T</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">CLI Authorization</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Authorize your local **tld** agent to sync labs and run validators on your behalf.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 animate-pulse">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Authorization Granted</h2>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                {message || "The CLI agent has been successfully paired with your DevLab account."}
              </p>
              <p className="text-xs text-[var(--accent-primary)] font-semibold mt-4">
                You can now safely close this tab and return to your terminal.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="userCode"
                className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider block text-center"
              >
                Enter User Code
              </Label>
              <Input
                id="userCode"
                type="text"
                placeholder="ABCD-EFGH"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
                disabled={status === "authorizing"}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground/45 h-14 rounded-xl text-center text-xl font-bold tracking-widest uppercase focus:border-[var(--accent-primary)] focus:ring-0 w-full"
              />
            </div>

            {status === "error" && message && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-center">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "authorizing" || !userCode.trim()}
              className="w-full h-12 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-4 transition-all text-white dark:text-black cursor-pointer shadow-sm shadow-[rgba(var(--accent-primary-rgb),0.1)]"
            >
              {status === "authorizing" ? "Authorizing CLI..." : "Authorize CLI"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CliVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-muted-foreground animate-pulse text-sm">Loading page...</div>
        </div>
      }
    >
      <CliVerifyContent />
    </Suspense>
  );
}
