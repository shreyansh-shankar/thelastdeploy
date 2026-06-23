// web/frontend/app/register/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.register(email, username, password);
      setIsRegistered(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 animate-bounce">
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
                d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Check your email</h1>
            <p className="text-muted-foreground text-sm mt-2">
              We&apos;ve sent a verification link to <span className="font-bold text-foreground">{email}</span>.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Please click the link in the email to activate your account.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
          >
            Go to Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[var(--accent-primary)]"
          >
            <span className="text-black dark:text-black font-black text-xl">T</span>
          </div>
          <h1 className="text-3xl font-black text-foreground">Create account</h1>
          <p className="text-muted-foreground text-sm mt-1">Free forever. No credit card needed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="fsociety"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-card border-border text-foreground placeholder:text-muted-foreground/45 h-12 rounded-xl focus:border-[var(--accent-primary)] focus:ring-0"
            />
          </div>
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
            <Label htmlFor="password" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
              Password
            </Label>
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
            <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2 transition-all text-white dark:text-black cursor-pointer shadow-sm shadow-[rgba(var(--accent-primary-rgb),0.1)]"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold hover:text-foreground transition-colors text-[var(--accent-primary)]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}