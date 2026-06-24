"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (time.launched) return null;

  const segments = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {segments.map((seg, i) => (
        <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(34,197,94,0.12)",
              borderRadius: "10px",
              padding: "12px 16px",
              minWidth: "72px",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "28px",
                fontWeight: 700,
                color: "#f0f0ff",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                tabularNums: true,
              } as React.CSSProperties}
            >
              {String(seg.value).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#4a4a6a",
                marginTop: "6px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span
              className="animate-blink"
              style={{
                fontFamily: "monospace",
                fontSize: "20px",
                color: "rgba(34,197,94,0.4)",
                fontWeight: 700,
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
