// web/frontend/hooks/use-modules.ts
//
// Session-cached modules list.
// - Same tab navigation → served from sessionStorage (no backend call)
// - Manual reload / new tab → fetched fresh from backend
// - Includes completed_sections progress from dashboard cache

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Module } from "@/lib/types";
import { readCache } from "@/lib/dashboard/use-dashboard-cache";

const SESSION_KEY = "tld:modules:v1";

function readSession(): Module[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Module[];
  } catch {
    return null;
  }
}

function writeSession(modules: Module[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(modules));
  } catch {}
}

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = readSession();

    if (session) {
      // Session hit — use it, no backend call
      setModules(session);
      setLoading(false);
      return;
    }

    // Session miss — fetch from backend, then cache in sessionStorage
    api.getModules()
      .then(({ modules }) => {
        writeSession(modules);
        setModules(modules);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { modules, loading, error };
}