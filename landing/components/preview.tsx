"use client";

const previews = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Track XP, level progression, and activity streaks across all tracks.",
    accent: "#22c55e",
    glow: "rgba(34,197,94,0.12)",
    content: (
      <div style={{ padding: "20px", fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}>
        {/* XP bar */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#8888aa", fontSize: "11px" }}>
            <span>Docker Engineer II</span>
            <span style={{ color: "#22c55e" }}>2,450 / 3,000 XP</span>
          </div>
          <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: "82%",
              background: "linear-gradient(90deg, #22c55e, #86efac)",
              borderRadius: "999px",
              boxShadow: "0 0 8px rgba(34,197,94,0.5)",
            }} />
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { label: "Labs Done", value: "47" },
            { label: "Streak", value: "12d" },
            { label: "Rank", value: "#384" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#f0f0ff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#6a6a8a", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "explorer",
    label: "Module Explorer",
    description: "Browse labs by topic with clear prerequisites, difficulty, and XP rewards.",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.12)",
    content: (
      <div style={{ padding: "16px", fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}>
        {[
          { name: "docker-fundamentals", xp: 50, diff: "Intro", done: true },
          { name: "networking-deep-dive", xp: 75, diff: "Mid", done: true },
          { name: "compose-orchestration", xp: 100, diff: "Mid", done: false },
          { name: "multi-stage-builds", xp: 125, diff: "Hard", done: false },
        ].map((lab, i) => (
          <div key={lab.name} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            borderRadius: "8px",
            background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
            marginBottom: "4px",
          }}>
            <span style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: lab.done ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${lab.done ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              color: lab.done ? "#22c55e" : "#4a4a6a",
              flexShrink: 0,
            }}>
              {lab.done ? "✓" : "○"}
            </span>
            <span style={{ color: lab.done ? "#8888aa" : "#c0c0d8", flex: 1, fontSize: "11px" }}>{lab.name}</span>
            <span style={{ fontSize: "10px", color: "#22c55e" }}>+{lab.xp}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "cli",
    label: "CLI Agent",
    description: "Validate challenges directly from your terminal. No browser required.",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    content: (
      <div style={{ padding: "16px 20px", fontFamily: "JetBrains Mono, monospace", fontSize: "12px", lineHeight: 1.9 }}>
        <div style={{ color: "#4a4a6a" }}># Checking your solution...</div>
        <div>
          <span style={{ color: "#f59e0b" }}>❯</span>
          {" "}<span style={{ color: "#f0f0ff" }}>tld check --verbose</span>
        </div>
        <div style={{ color: "#22c55e", paddingLeft: "12px" }}>✓ nginx service running</div>
        <div style={{ color: "#22c55e", paddingLeft: "12px" }}>✓ port 443 responding</div>
        <div style={{ color: "#22c55e", paddingLeft: "12px" }}>✓ SSL certificate valid</div>
        <div style={{ color: "#22c55e", paddingLeft: "12px" }}>✓ redirect http → https</div>
        <div style={{ color: "#f87171", paddingLeft: "12px" }}>✗ rate limiting not configured</div>
        <div style={{ marginTop: "4px" }}>
          <span style={{ color: "#4a4a6a" }}>4/5 checks passed — </span>
          <span style={{ color: "#f59e0b" }}>almost there!</span>
        </div>
      </div>
    ),
  },
];

export default function Preview() {
  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* ambient */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-badge" style={{
              borderColor: "rgba(168,85,247,0.25)",
              background: "rgba(168,85,247,0.06)",
              color: "#c084fc",
            }}>
              Product Preview
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            A first look at what{" "}
            <span className="text-gradient-purple">we&apos;re building</span>
          </h2>
          <p style={{ fontSize: "18px", color: "#8888aa", maxWidth: "460px", margin: "0 auto", lineHeight: 1.6 }}>
            Every screen is designed to keep you in flow — no distractions, just progress.
          </p>
        </div>

        {/* Preview cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {previews.map((preview) => (
            <div
              key={preview.id}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${preview.accent}20`,
                background: "rgba(13,13,31,0.8)",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = preview.accent + "40";
                el.style.boxShadow = `0 0 30px ${preview.glow}, 0 20px 40px rgba(0,0,0,0.4)`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = preview.accent + "20";
                el.style.boxShadow = "none";
                el.style.transform = "none";
              }}
            >
              {/* Fake screen header */}
              <div style={{
                background: "#080814",
                borderBottom: `1px solid ${preview.accent}18`,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
                <span style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#4a4a6a",
                }}>
                  tld — {preview.label.toLowerCase()}
                </span>
                <div style={{
                  marginLeft: "auto",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: preview.accent,
                  boxShadow: `0 0 6px ${preview.accent}`,
                }} />
              </div>

              {/* Preview content */}
              <div style={{ minHeight: "160px" }}>
                {preview.content}
              </div>

              {/* Caption */}
              <div style={{
                padding: "16px 20px",
                borderTop: `1px solid ${preview.accent}12`,
                background: "rgba(0,0,0,0.2)",
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#f0f0ff", marginBottom: "4px" }}>
                  {preview.label}
                </h3>
                <p style={{ fontSize: "12px", color: "#6a6a8a", lineHeight: 1.55 }}>
                  {preview.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
