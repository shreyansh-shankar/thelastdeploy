"use client";

const VideoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const CodeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const TerminalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
);
const CloudIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
);
const QuizIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const LaptopIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
);
const BugIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-3 1.5-6 3-8M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M21 21c0-3-1.5-6-3-8"/></svg>
);
const FreeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const OpenSourceIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22a1 1 0 0 1-1-1v-4h-4v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11l7-9 7 9v10a1 1 0 0 1-1 1z"/></svg>
);

const traditional = [
  { text: "Watch pre-recorded videos passively", icon: <VideoIcon /> },
  { text: "Follow copy-paste tutorials", icon: <CodeIcon /> },
  { text: "Browser-based fake terminals", icon: <TerminalIcon /> },
  { text: "Expensive cloud environments", icon: <CloudIcon /> },
  { text: "Multiple-choice quizzes", icon: <QuizIcon /> },
  { text: "Closed-source, gatekept content", icon: <LockIcon /> },
];

const tld = [
  { text: "Run labs on your actual machine", icon: <LaptopIcon /> },
  { text: "Real troubleshooting scenarios", icon: <BugIcon /> },
  { text: "Native terminal — full control", icon: <TerminalIcon /> },
  { text: "No cloud costs — completely free", icon: <FreeIcon /> },
  { text: "Practical validation with tld check", icon: <CheckIcon /> },
  { text: "Fully open source & community-driven", icon: <OpenSourceIcon /> },
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(239,68,68,0.5)",
                    minWidth: "20px",
                    flexShrink: 0,
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(34,197,94,0.6)",
                    minWidth: "20px",
                    flexShrink: 0,
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
