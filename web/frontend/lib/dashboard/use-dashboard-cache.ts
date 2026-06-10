// web/frontend/lib/dashboard/use-dashboard-cache.ts
//
// Cache-first dashboard store.
// Backend is ONLY called when cache is empty (first login / after logout).
// All updates (XP, completions) patch the cache directly — no re-fetch.

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { User, ModuleDetail } from "@/lib/types";
import { patchModulesMemoryCache } from "@/hooks/use-modules";

const CACHE_KEY = "tld:dashboard:v4";

export interface DashboardCache {
  user: User;
  modules: ModuleDetail[];
}

// ── Raw localStorage helpers ───────────────────────────────────────────────

export function readCache(): DashboardCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DashboardCache;
  } catch {
    return null;
  }
}

export const CACHE_EVENT = "tld:dashboard:updated";

export function writeCache(data: DashboardCache): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CACHE_EVENT));
    }
  } catch {
    // localStorage quota exceeded — silently ignore
  }
}

export function clearDashboardCache(): void {
  localStorage.removeItem(CACHE_KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CACHE_EVENT));
  }
}

/**
 * Patch user fields in cache (e.g. xp, completed_labs, completed_sections).
 * Merges arrays — doesn't overwrite, only appends new items.
 */
export function patchCacheUser(partial: Partial<User>): void {
  const cache = readCache();
  if (!cache) return;

  const updated: User = {
    ...cache.user,
    // xp: use provided value if given, else keep existing
    xp: partial.xp !== undefined ? partial.xp : cache.user.xp,
    // Merge arrays — append new items, deduplicate
    completed_labs: partial.completed_labs
      ? [...new Set([...cache.user.completed_labs, ...partial.completed_labs])]
      : cache.user.completed_labs,
    completed_sections: partial.completed_sections
      ? [...new Set([...cache.user.completed_sections, ...partial.completed_sections])]
      : cache.user.completed_sections,
  };

  writeCache({ ...cache, user: updated });
}

// ── React hook ─────────────────────────────────────────────────────────────

interface UseDashboardCacheReturn {
  data: DashboardCache | null;
  loading: boolean;   // true only when fetching from backend (cache miss)
  error: string | null;
  patch: (partial: Partial<User>) => void;  // instant local update
}

export function useDashboardCache(): UseDashboardCacheReturn {
  const [data, setData] = useState<DashboardCache | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = readCache();

    if (cached) {
      // Cache hit — use it, done. No backend call.
      setData(cached);
      return;
    }

    // Cache miss — fetch from backend once, then store
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    (async () => {
      try {
        const [user, { modules: list }] = await Promise.all([
          api.getMe(),
          api.getModules(),
        ]);
        const modules = await Promise.all(list.map((m) => api.getModule(m.id)));
        const fresh: DashboardCache = { user, modules };
        writeCache(fresh);
        setData(fresh);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // runs once on mount

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleUpdate = () => {
      const cached = readCache();
      if (cached) setData(cached);
    };
    window.addEventListener(CACHE_EVENT, handleUpdate);
    return () => window.removeEventListener(CACHE_EVENT, handleUpdate);
  }, []);

  // Instant local patch — updates state + localStorage atomically
  const patch = useCallback((partial: Partial<User>) => {
    const cached = readCache();
    if (!cached) return;
    const updated: User = {
      ...cached.user,
      ...partial,
      completed_labs: partial.completed_labs
        ? [...new Set([...cached.user.completed_labs, ...partial.completed_labs])]
        : cached.user.completed_labs,
      completed_sections: partial.completed_sections
        ? [...new Set([...cached.user.completed_sections, ...partial.completed_sections])]
        : cached.user.completed_sections,
    };
    writeCache({ ...cached, user: updated });
  }, []);

  return { data, loading, error, patch };
}

// ── Memory modules cache patch ────────────────────────────────────────────
// Updates completed_sections count on the modules list in memory
// so modules page reflects progress without a backend call.

export function patchSessionModule(moduleId: string, completedSections: number): void {
  try {
    patchModulesMemoryCache(moduleId, completedSections);
  } catch { }
}

export function updateDashboardCacheModule(updated: ModuleDetail): void {
  const cache = readCache();
  if (!cache) return;
  const updatedModules = cache.modules.map((m) =>
    m.id === updated.id ? updated : m
  );
  writeCache({ ...cache, modules: updatedModules });
}

export function patchDashboardCacheModuleSectionCompleted(moduleId: string, sectionId: string): void {
  const cache = readCache();
  if (!cache) return;
  const updatedModules = cache.modules.map((m) => {
    if (m.id === moduleId) {
      const updatedSections = m.sections.map((s) =>
        s.id === sectionId ? { ...s, section_completed: true } : s
      );
      return { ...m, sections: updatedSections };
    }
    return m;
  });
  writeCache({ ...cache, modules: updatedModules });
}