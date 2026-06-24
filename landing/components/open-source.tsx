"use client";

import { SOCIAL_LINKS } from "@/lib/constants";

const principles = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Zero Vendor Lock-in",
    desc: "Everything runs on your machine. No account needed, no subscription, no dependency on our uptime.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Community First",
    desc: "Labs, validators, and curriculum are open to contributions. Anyone can fix, improve, or add.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Radical Transparency",
    desc: "Platform, roadmap, decisions, and revenue — all public. We build in the open, always.",
  },
];

export default function OpenSource() {
  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* ambient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}>
          {/* Left: text */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span className="section-badge">Open Source</span>
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}>
              Built entirely{" "}
              <span className="text-gradient">in the open</span>
            </h2>

            <p style={{ fontSize: "17px", color: "#8888aa", lineHeight: 1.7, marginBottom: "32px" }}>
              The platform, labs, validators, and all content are fully open source.
              No gatekeeping, no vendor lock-in, no hidden costs. Forever.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#030a04",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  borderRadius: "9px",
                  textDecoration: "none",
                  border: "1px solid rgba(34,197,94,0.3)",
                  boxShadow: "0 0 16px rgba(34,197,94,0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(34,197,94,0.35), 0 4px 16px rgba(0,0,0,0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(34,197,94,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Star on GitHub
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#a0a0cc",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "9px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#f0f0ff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "#a0a0cc";
                }}
              >
                Contribute →
              </a>
            </div>
          </div>

          {/* Right: principles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {principles.map((p) => (
              <div
                key={p.title}
                className="card-glass card-glass-hover"
                style={{
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22c55e",
                  flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#f0f0ff", marginBottom: "6px" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#6a6a8a", lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
