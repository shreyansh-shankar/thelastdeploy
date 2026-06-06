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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <span className="text-black font-black text-xl">T</span>
          </div>
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="text-[#666] text-sm mt-1">Log in to track your progress</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#aaa] text-xs font-semibold uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#111] border-[#2a2a2a] text-white placeholder:text-[#444] h-12 rounded-xl focus:border-[var(--accent-primary)] focus:ring-0"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[#aaa] text-xs font-semibold uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#111] border-[#2a2a2a] text-white placeholder:text-[#444] h-12 rounded-xl focus:border-[var(--accent-primary)] focus:ring-0"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold text-black transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-[#555] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold hover:text-white transition-colors" style={{ color: "var(--accent-primary)" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}