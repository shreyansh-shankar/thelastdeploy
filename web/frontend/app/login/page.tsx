// web/frontend/app/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResendMessage(null);
    setLoading(true);
    try {
      const { access_token, device_key } = await api.login(email, password);
      await login(access_token, device_key);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) return;
    setResendLoading(true);
    setResendMessage(null);
    try {
      const res = await api.resendVerification(email);
      setResendMessage(res.detail);
    } catch (err: unknown) {
      setResendMessage(err instanceof Error ? err.message : "Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[var(--accent-primary)]"
          >
            <span className="text-black dark:text-black font-black text-xl">T</span>
          </div>
          <h1 className="text-3xl font-black text-foreground">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Log in to track your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card border-border text-foreground placeholder:text-muted-foreground/45 h-12 rounded-xl focus:border-[var(--accent-primary)] focus:ring-0"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
                Password
              </Label>
              <Link href="/forgot-password" className="text-xs font-semibold hover:underline text-[var(--accent-primary)]">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-card border-border text-foreground placeholder:text-muted-foreground/45 h-12 rounded-xl focus:border-[var(--accent-primary)] focus:ring-0"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl flex flex-col gap-2">
              <span>{error}</span>
              {error.includes("verify your email") && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="text-left text-xs font-bold text-[var(--accent-primary)] underline hover:opacity-80 disabled:opacity-50 cursor-pointer"
                >
                  {resendLoading ? "Resending..." : "Resend verification email"}
                </button>
              )}
            </div>
          )}

          {resendMessage && (
            <div className="text-sm text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl">
              {resendMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2 transition-all text-white dark:text-black cursor-pointer shadow-sm shadow-[rgba(var(--accent-primary-rgb),0.1)]"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold hover:text-foreground transition-colors text-[var(--accent-primary)]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}