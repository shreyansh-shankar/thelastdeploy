// web/frontend/components/modules/lab-block.tsx

"use client";

import Link from "next/link";
import { Lab } from "@/lib/types";
import { CheckCircle2, Circle, Terminal } from "lucide-react";

interface Props {
  lab: Lab;
  moduleId: string;
  isLoggedIn: boolean;
}

export function LabBlock({ lab, moduleId, isLoggedIn }: Props) {
  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#0d0d0d] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1a1a1a] bg-[#111] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {lab.completed ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-primary)" }} />
          ) : (
            <Circle className="h-4 w-4 text-[#444] shrink-0" />
          )}
          <div>
            <p className="font-bold text-sm text-white">{lab.title}</p>
            <p className="text-[10px] font-mono text-[#555] mt-0.5">{lab.id}</p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold shrink-0" style={{ color: "var(--accent-primary)" }}>
          +{lab.xp} XP
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {!isLoggedIn ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#666]">Sign in to track your progress on this lab.</p>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-bold text-black shrink-0"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Sign in
            </Link>
          </div>
        ) : lab.completed ? (
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(var(--accent-primary-rgb),0.15)" }}
            >
              <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Lab completed!</p>
              <p className="text-xs text-[#666] mt-0.5">
                You earned{" "}
                <span className="font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                  {lab.xp} XP
                </span>{" "}
                for this lab.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                <Terminal className="h-5 w-5 text-[#444]" />
              </div>
              <div>
                <p className="font-bold text-white">Complete this lab in your terminal</p>
                <p className="text-sm text-[#666] mt-0.5">
                  Use the{" "}
                  <code
                    className="text-xs bg-[#111] px-1.5 py-0.5 rounded font-mono"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    tld
                  </code>{" "}
                  agent to start and validate this lab.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-[#2a2a2a] bg-black/40 px-5 py-4 font-mono text-sm space-y-2">
              <p>
                <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
                <span className="text-white">tld start {lab.id}</span>
              </p>
              <p className="text-[#555]"># Complete the task shown in your terminal</p>
              <p>
                <span style={{ color: "var(--accent-primary)" }}>❯</span>{" "}
                <span className="text-white">tld check</span>
              </p>
            </div>
            {lab.estimated_minutes && (
              <p className="text-xs text-[#555]">Estimated time: ~{lab.estimated_minutes} minutes</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}