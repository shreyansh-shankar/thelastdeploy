// web/frontend/lib/auth.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { User } from "./types";
import { readCache } from "./dashboard/use-dashboard-cache";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, deviceKey?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Try cache first — avoids an extra /me call on every page load
      const cache = readCache();
      if (cache?.user) {
        setUser(cache.user);
        return;
      }
      const me = await api.getMe();
      setUser(me);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("device_key");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string, deviceKey?: string) => {
    localStorage.setItem("token", token);
    if (deviceKey) localStorage.setItem("device_key", deviceKey);
    // Cache was already warmed by api.login() — just read from it
    const cache = readCache();
    if (cache?.user) {
      setUser(cache.user);
    } else {
      await fetchUser();
    }
  };

  const logout = () => {
    api.logout(); // clears token, device_key, and dashboard cache
    setUser(null);
  };

  const refreshUser = async () => {
    // Read from cache — no backend call unless cache is empty
    const cache = readCache();
    if (cache?.user) {
      setUser(cache.user);
      return;
    }
    const token = localStorage.getItem("token");
    if (token) await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);