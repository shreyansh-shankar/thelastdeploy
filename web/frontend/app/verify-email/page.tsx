// web/frontend/app/verify-email/page.tsx

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing. Please request a new link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.verifyEmail(token);
        setStatus("success");
        setMessage(res.detail);
      } catch (err: unknown) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Failed to verify email.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl text-center space-y-6">
        {status === "verifying" && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
              <svg
                className="w-8 h-8 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-foreground">Verifying...</h1>
            <p className="text-muted-foreground text-sm">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
              <svg
                className="w-8 h-8 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-foreground">Verified!</h1>
            <p className="text-muted-foreground text-sm">{message}</p>
            <Link
              href="/login"
              className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
            >
              Go to Log in
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-foreground">Verification Failed</h1>
            <p className="text-red-500/90 text-sm bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
              {message}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-foreground border border-border hover:bg-muted transition-all"
              >
                Back to Log in
              </Link>
              <Link
                href="/register"
                className="inline-block w-full h-12 leading-[48px] rounded-xl font-bold text-background bg-[var(--accent-primary)] hover:opacity-90 transition-all text-white dark:text-black shadow-sm"
              >
                Create a new account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-muted-foreground animate-pulse text-sm">Loading page...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
