"use client";

export default function Problem() {
  const pains = [
    {
      icon: "▶",
      title: "Watch hours of video tutorials",
      description: "Passive consumption that feels like progress but isn't. You finish a 10-hour course and still can't debug a real incident.",
      color: "#ef4444",
    },
    {
      icon: "/>",
      title: "Copy commands without understanding",
      description: "Follow along, paste, move on — nothing sticks. You're memorizing keystrokes, not building intuition.",
      color: "#f97316",
    },
    {
      icon: "✓?",
      title: "Finish courses, still unprepared",
      description: "Real incidents don't follow a script. Multiple-choice quizzes can't simulate a broken production system at 2am.",
      color: "#eab308",
    },
    {
      icon: "$$$",
      title: "Expensive cloud environments",
      description: "Pay per hour for browser-based terminals you can't customize, can't keep, and can't use offline.",
      color: "#ec4899",
    },
  ];

  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient background */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-badge" style={{
              borderColor: "rgba(239,68,68,0.25)",
              background: "rgba(239,68,68,0.06)",
              color: "#f87171",
            }}>
              The Problem
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            DevOps education is{" "}
            <span style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              broken
            </span>
          </h2>
          <p style={{
            fontSize: "18px",
            color: "#8888aa",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Current approaches leave engineers unprepared for what actually matters.
          </p>
        </div>

        {/* Pain cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="card-glass card-glass-hover"
              style={{
                borderRadius: "14px",
                padding: "24px",
                cursor: "default",
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: `${pain.color}12`,
                border: `1px solid ${pain.color}30`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                color: pain.color,
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}>
                {pain.icon}
              </div>
              <h3 style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#f0f0ff",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}>
                {pain.title}
              </h3>
              <p style={{
                fontSize: "13px",
                color: "#6666888",
                lineHeight: 1.65,
                color: "#7070909",
              } as React.CSSProperties}>
                {pain.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge callout */}
        <div style={{
          marginTop: "48px",
          padding: "24px 32px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(168,85,247,0.06) 100%)",
          border: "1px solid rgba(34,197,94,0.12)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "16px", color: "#a0a0cc", lineHeight: 1.6 }}>
            <span style={{
              background: "linear-gradient(135deg, #22c55e, #86efac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
            }}>
              The Last Deploy
            </span>{" "}
            is the missing bridge between passive tutorials and real-world systems mastery.
          </p>
        </div>
      </div>
    </section>
  );
}
