"use client";

const steps = [
  {
    num: "01",
    label: "Learn",
    description: "Understand the concept with focused, short-form theory",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: "02",
    label: "Start",
    description: "Spin up a local lab on your own machine in seconds",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: "03",
    label: "Break",
    description: "Encounter a deliberately broken system. Debug it",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    num: "04",
    label: "Fix",
    description: "Apply your knowledge to restore the system",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: "05",
    label: "Validate",
    description: "Run tld check — automated verification against real criteria",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    num: "06",
    label: "Level Up",
    description: "Earn XP, badges, and track your progress over time",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
];

const commands = [
  { prompt: "❯", cmd: "tld sync --all", out: "✓ Synced 47 labs across 4 tracks", outColor: "#22c55e" },
  { prompt: "❯", cmd: "tld start docker-fundamentals", out: "✓ Environment ready — 3 containers up", outColor: "#22c55e" },
  { prompt: "❯", cmd: "docker ps", out: "→ nginx, postgres, redis are running", outColor: "#8888aa" },
  { prompt: "❯", cmd: "tld check", out: "✓ All 5 checks passed  (+25 XP)", outColor: "#22c55e" },
];

export default function HowItWorks() {
  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* bg glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        background: "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-badge">How It Works</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            A loop that builds{" "}
            <span className="text-gradient">real skills</span>
          </h2>
          <p style={{ fontSize: "18px", color: "#8888aa", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
            Six steps. Infinite growth. Every lab makes you sharper.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "64px",
        }}>
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="card-glass card-glass-hover"
              style={{
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.15)",
                color: "#22c55e",
                marginBottom: "14px",
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: "10px",
                fontFamily: "JetBrains Mono, monospace",
                color: "#4a4a6a",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#f0f0ff",
                marginBottom: "8px",
              }}>
                {step.label}
              </h3>
              <p style={{ fontSize: "12px", color: "#6a6a8a", lineHeight: 1.55 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Terminal demo */}
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: "#ff5f57" }} />
              <div className="terminal-dot" style={{ background: "#febc2e" }} />
              <div className="terminal-dot" style={{ background: "#28c840" }} />
              <span style={{
                marginLeft: "10px",
                fontSize: "12px",
                color: "#4a4a6a",
                fontFamily: "JetBrains Mono, monospace",
              }}>
                tld — terminal
              </span>
            </div>
            <div style={{
              padding: "20px 24px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "13px",
              lineHeight: 2,
            }}>
              {commands.map((c, i) => (
                <div key={i}>
                  <div>
                    <span style={{ color: "#22c55e" }}>{c.prompt}</span>
                    {" "}
                    <span style={{ color: "#f0f0ff" }}>{c.cmd}</span>
                  </div>
                  <div style={{ color: c.outColor, paddingLeft: "14px" }}>
                    {c.out}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "4px" }}>
                <span style={{ color: "#22c55e" }}>❯</span>
                {" "}
                <span
                  className="animate-blink"
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "16px",
                    background: "#22c55e",
                    verticalAlign: "middle",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
