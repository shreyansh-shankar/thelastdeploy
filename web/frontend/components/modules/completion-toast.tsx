// web/frontend/components/modules/completion-toast.tsx

"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Zap, X } from "lucide-react";

interface Props {
  sectionTitle: string;
  xpAwarded: number;
  onDismiss: () => void;
}

export function CompletionToast({ sectionTitle, xpAwarded, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Mount → slide in
    const t1 = setTimeout(() => setVisible(true), 10);

    // Auto-dismiss after 3.5s
    const t2 = setTimeout(() => dismiss(), 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      style={{
        transform: visible && !leaving ? "translateY(0)" : "translateY(calc(100% + 24px))",
        opacity: visible && !leaving ? 1 : 0,
      }}
    >
      <div
        className="flex items-center gap-4 px-5 py-4 rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: "#0d0d0d",
          borderColor: "rgba(var(--accent-primary-rgb), 0.4)",
          boxShadow: "0 0 40px rgba(var(--accent-primary-rgb), 0.15)",
          minWidth: "280px",
        }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(var(--accent-primary-rgb), 0.15)" }}
        >
          <CheckCircle2 className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">Section complete!</p>
          <p className="text-[#666] text-xs truncate mt-0.5">{sectionTitle}</p>
          {xpAwarded > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Zap className="h-3 w-3" style={{ color: "var(--accent-primary)" }} />
              <span className="text-xs font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                +{xpAwarded} XP
              </span>
            </div>
          )}
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          className="shrink-0 text-[#444] hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
        <div
          className="h-full rounded-b-2xl"
          style={{
            backgroundColor: "var(--accent-primary)",
            animation: visible && !leaving ? "shrink 3.5s linear forwards" : "none",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}