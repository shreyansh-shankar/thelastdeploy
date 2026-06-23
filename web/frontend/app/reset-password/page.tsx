// web/frontend/app/reset-password/page.tsx

"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing. Please request a new password reset.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(token, password);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
        <div className="w-full max-w-sm bg-card border border-border p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">Invalid Reset Request</h1>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              The reset token is missing or invalid. Please check your link or request a new password reset.
            </p>
          </div>
          <Link
            href="/forgot-password"
            className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
        <div className="w-full max-w-sm bg-card border border-border p-8 rounded-2xl shadow-xl text-center space-y-6">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">Password Reset</h1>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Your password has been successfully updated.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
          >
            Log in Now
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
          <h1 className="text-3xl font-black text-foreground">Reset password</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Choose a strong new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
              New Password
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-muted-foreground/80 text-xs font-semibold uppercase tracking-wider">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting password..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-muted-foreground animate-pulse text-sm">Loading page...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
