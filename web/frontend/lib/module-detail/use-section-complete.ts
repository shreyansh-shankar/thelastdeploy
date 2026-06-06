// web/frontend/lib/module-detail/use-section-complete.ts

import { useCallback, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8742";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

interface Options {
  // Called instantly (optimistic) with section's own xp value
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

      const url = `${API_BASE}/modules/${moduleId}/sections/${sectionId}/complete`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // 1. Instant optimistic update with the section's own XP
      onComplete(sectionId, sectionXp);

      // 2. Background fetch
      try {
        await fetch(url, { method: "POST", headers });
      } catch {
        // 3. sendBeacon fallback if tab closes mid-request
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