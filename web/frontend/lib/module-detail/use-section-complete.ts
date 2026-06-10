// web/frontend/lib/module-detail/use-section-complete.ts

import { useCallback, useRef } from "react";
import { patchCacheUser } from "@/lib/dashboard/use-dashboard-cache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8742";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

interface Options {
  onComplete: (sectionId: string, xpAwarded: number) => void;
}

export function useSectionComplete({ onComplete }: Options) {
  const firedRef = useRef<Set<string>>(new Set());

  const completeSection = useCallback(
    async (moduleId: string, sectionId: string, sectionXp: number) => {
      if (firedRef.current.has(sectionId)) return;
      firedRef.current.add(sectionId);

      const token = getToken();
      if (!token) return;

      // 1. Instant UI update
      onComplete(sectionId, sectionXp);

      // 2. Patch localStorage cache immediately — persists across tabs/refresh
      patchCacheUser({
        completed_sections: [sectionId],
        xp: undefined, // xp will be updated from API response below
      });

      // 3. Background API call
      try {
        const res = await fetch(
          `${API_BASE}/modules/${moduleId}/sections/${sectionId}/complete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const { total_xp } = await res.json();
          // Update XP in cache with confirmed value from backend
          patchCacheUser({ xp: total_xp });
        }
      } catch {
        // sendBeacon fallback for tab-close scenario
        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob(
            [JSON.stringify({ token, module_id: moduleId, section_id: sectionId })],
            { type: "application/json" }
          );
          navigator.sendBeacon(`${API_BASE}/beacon/complete-section`, blob);
        }
        firedRef.current.delete(sectionId);
      }
    },
    [onComplete]
  );

  return { completeSection };
}