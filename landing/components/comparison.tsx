"use client";

const traditional = [
  { text: "Watch pre-recorded videos passively", icon: "▶" },
  { text: "Follow copy-paste tutorials", icon: "/>" },
  { text: "Browser-based fake terminals", icon: "⌨" },
  { text: "Expensive cloud environments", icon: "$" },
  { text: "Multiple-choice quizzes", icon: "?" },
  { text: "Closed-source, gatekept content", icon: "🔒" },
];

const tld = [
  { text: "Run labs on your actual machine", icon: "💻" },
  { text: "Real troubleshooting scenarios", icon: "🔥" },
  { text: "Native terminal — full control", icon: ">_" },
  { text: "No cloud costs — completely free", icon: "∞" },
  { text: "Practical validation with tld check", icon: "✓" },
  { text: "Fully open source & community-driven", icon: "⬡" },
];

export default function Comparison() {
  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* ambient */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "25%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translateY(-50%)",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-badge">Why TLD</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            A fundamentally{" "}
            <span className="text-gradient">different approach</span>
          </h2>
          <p style={{ fontSize: "18px", color: "#8888aa", maxWidth: "460px", margin: "0 auto", lineHeight: 1.6 }}>
            Not another course platform. Built from the ground up for real skills.
          </p>
        </div>

        {/* Comparison grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}>
          {/* Traditional — left */}
          <div style={{
            borderRadius: "16px",
            padding: "32px",
            background: "rgba(239,68,68,0.03)",
            border: "1px solid rgba(239,68,68,0.12)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                color: "#f87171",
              }}>
                ✕
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f87171" }}>
                Traditional Learning
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {traditional.map((item) => (
                <li
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#6a6a8a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "rgba(239,68,68,0.03)",
                    border: "1px solid rgba(239,68,68,0.06)",
                  }}
                >
                  <span style={{
                    fontSize: "11px",
                    color: "#ef444460",
                    fontFamily: "JetBrains Mono, monospace",
                    minWidth: "20px",
                    textAlign: "center",
                  }}>
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* TLD — right */}
          <div style={{
            borderRadius: "16px",
            padding: "32px",
            background: "rgba(34,197,94,0.03)",
            border: "1px solid rgba(34,197,94,0.15)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 30px rgba(34,197,94,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                color: "#22c55e",
                boxShadow: "0 0 10px rgba(34,197,94,0.15)",
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: "16px",
                fontWeight: 700,
                background: "linear-gradient(135deg, #22c55e, #86efac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                The Last Deploy
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {tld.map((item) => (
                <li
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#c0c0d8",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "rgba(34,197,94,0.04)",
                    border: "1px solid rgba(34,197,94,0.08)",
                  }}
                >
                  <span style={{
                    fontSize: "11px",
                    color: "#22c55e80",
                    fontFamily: "JetBrains Mono, monospace",
                    minWidth: "20px",
                    textAlign: "center",
                  }}>
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
