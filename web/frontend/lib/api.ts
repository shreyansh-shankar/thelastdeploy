// web/frontend/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8742";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }
  return res.json();
}

export const api = {
  // Auth
  register: (email: string, username: string, password: string) =>
    request<{ access_token: string }>("/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    }),

  login: (email: string, password: string) =>
    request<{ access_token: string }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // Challenges
  getChallenges: () =>
    request<{ challenges: { id: string; yaml: string }[] }>("/challenges"),

  getChallenge: (id: string) =>
    request<{
      id: string;
      title: string;
      description: string;
      topic: string;
      difficulty: string;
      xp: number;
      estimated_minutes: number;
      completed: boolean;
    }>(`/challenges/${id}`),

  // Users
  getMe: () =>
    request<{
      id: number;
      username: string;
      email: string;
      xp: number;
      streak_days: number;
      completed_challenges: string[];
    }>("/me"),

  getLeaderboard: () =>
    request<{
      leaderboard: { rank: number; username: string; xp: number; completed: number }[];
    }>("/leaderboard"),
};