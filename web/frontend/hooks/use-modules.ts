// web/frontend/hooks/use-modules.ts

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Module } from "@/lib/types";

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getModules()
      .then(({ modules }) => setModules(modules))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { modules, loading, error };
}