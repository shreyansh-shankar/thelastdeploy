// web/frontend/hooks/use-modules.ts
//
// Memory-cached modules list.
// - Same tab navigation (client-side routing) → served from memory (no backend call)
// - Manual reload / new tab → memory is cleared, fetched fresh from backend

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Module, ModuleDetail } from "@/lib/types";

// In-memory cache surviving client-side navigation but not page reloads
let memoryModulesCache: Module[] | null = null;

export function clearModulesMemoryCache(): void {
  memoryModulesCache = null;
}

export function patchModulesMemoryCache(moduleId: string, completedSectionsOrSectionId: number | string): void {
  if (!memoryModulesCache) return;
  memoryModulesCache = memoryModulesCache.map((m) => {
    if (m.id === moduleId) {
      if (typeof completedSectionsOrSectionId === "number") {
        return { ...m, completed_sections: completedSectionsOrSectionId };
      } else {
        const newCompleted = Math.min(m.completed_sections + 1, m.total_sections);
        return { ...m, completed_sections: newCompleted };
      }
    }
    return m;
  });
}

export function updateModuleInMemoryCache(updated: ModuleDetail | Module): void {
  if (!memoryModulesCache) return;
  memoryModulesCache = memoryModulesCache.map((m) => {
    if (m.id === updated.id) {
      const completedSections = "sections" in updated
        ? updated.sections.filter((s) => s.section_completed).length
        : updated.completed_sections;

      return {
        ...m,
        title: updated.title,
        description: updated.description,
        topic: updated.topic,
        difficulty: updated.difficulty,
        estimated_minutes: updated.estimated_minutes,
        tags: updated.tags,
        total_xp: updated.total_xp,
        total_sections: updated.total_sections,
        completed_sections: completedSections,
      };
    }
    return m;
  });
}

export function useModules() {
  const [modules, setModules] = useState<Module[]>(memoryModulesCache || []);
  const [loading, setLoading] = useState(!memoryModulesCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memoryModulesCache) {
      setModules(memoryModulesCache);
      setLoading(false);
      return;
    }

    setLoading(true);
    api.getModules()
      .then(({ modules }) => {
        memoryModulesCache = modules;
        setModules(modules);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { modules, loading, error };
}