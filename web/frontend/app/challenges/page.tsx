// web/frontend/app/challenges/page.tsx

"use client";

import { useChallenges } from "@/hooks/use-challenges";
import { ChallengeGrid } from "@/components/challenges/challenge-grid";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function ChallengesPage() {
  const { challenges, loading, error } = useChallenges();

  return (
    <div>
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black tracking-tight">Challenges</h1>
          <p className="mt-2 text-[#888] max-w-xl">
            Hands-on labs for Docker, Kubernetes, Linux, and CI/CD.
            No account needed to browse.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && (
          <div className="text-center py-20 text-red-400 text-sm">
            Failed to load challenges: {error}
          </div>
        )}
        {!loading && !error && <ChallengeGrid challenges={challenges} />}
      </div>
    </div>
  );
}