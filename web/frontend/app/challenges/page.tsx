// web/frontend/app/challenges/page.tsx

"use client";

import { useChallenges } from "@/hooks/use-challenges";
import { ChallengeGrid } from "@/components/challenges/challenge-grid";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function ChallengesPage() {
  const { challenges, loading, error } = useChallenges();

  return (
    <div>
      <PageHeader
        title="Challenges"
        description="Hands-on labs for Docker, Kubernetes, Linux, and CI/CD. No account needed to browse."
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && <LoadingSpinner className="py-20" />}
        {error && (
          <div className="text-center py-20 text-destructive">
            Failed to load challenges: {error}
          </div>
        )}
        {!loading && !error && <ChallengeGrid challenges={challenges} />}
      </div>
    </div>
  );
}