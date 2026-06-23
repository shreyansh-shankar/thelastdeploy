// web/frontend/app/forgot-password/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await api.forgotPassword(email);
      setMessage(res.detail);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to request password reset");
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-black text-foreground">Forgot password</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>

        {message ? (
          <div className="space-y-6 bg-card border border-border p-6 rounded-2xl shadow-xl text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {message}
            </p>
            <Link
              href="/login"
              className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
            >
              Back to Log in
            </Link>
          </div>
        ) : (
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

            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2 transition-all text-white dark:text-black cursor-pointer shadow-sm shadow-[rgba(var(--accent-primary-rgb),0.1)]"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
            
            <div className="text-center mt-4">
              <Link href="/login" className="text-sm font-semibold hover:underline text-[var(--accent-primary)]">
                Back to Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
