"use client";

import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="cta"
      style={{
        position: "relative",
        padding: "96px 24px 112px",
        overflow: "hidden",
      }}
    >
      {/* Border top with glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.4) 30%, rgba(168,85,247,0.4) 70%, transparent)",
      }} />

      {/* Big ambient glow */}
      <div
        className="animate-float-slow"
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 100% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "640px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        {/* Badge */}
        <div style={{ marginBottom: "24px" }}>
          <span className="section-badge animate-pulse-glow">
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
              boxShadow: "0 0 6px rgba(34,197,94,0.8)",
            }} />
            Early Access · Limited Spots
          </span>
        </div>

        <h2 style={{
          fontSize: "clamp(32px, 5vw, 60px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          marginBottom: "20px",
        }}>
          Ready for the{" "}
          <span className="text-gradient">Final Deploy</span>?
        </h2>

        <p style={{
          fontSize: "18px",
          color: "#8888aa",
          lineHeight: 1.65,
          maxWidth: "480px",
          margin: "0 auto 40px",
        }}>
          Join the waitlist for early access, launch updates, and behind-the-scenes progress.
          Zero spam. Unsubscribe anytime.
        </p>

        {/* Email form or success state */}
        {submitted ? (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 28px",
            borderRadius: "12px",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            boxShadow: "0 0 20px rgba(34,197,94,0.1)",
          }}>
            <span style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}>
              ✓
            </span>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#4ade80", marginBottom: "2px" }}>
                You&apos;re on the list!
              </p>
              <p style={{ fontSize: "12px", color: "#6a6a8a" }}>
                We&apos;ll reach out as soon as TLD launches.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "8px",
              maxWidth: "480px",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "13px 18px",
                fontSize: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: "#f0f0ff",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s ease",
              }}
              onFocus={e => {
                (e.target as HTMLInputElement).style.borderColor = "rgba(34,197,94,0.3)";
                (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(34,197,94,0.08)";
              }}
              onBlur={e => {
                (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.target as HTMLInputElement).style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              className="glow-green"
              style={{
                padding: "13px 24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#030a04",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                borderRadius: "10px",
                border: "1px solid rgba(34,197,94,0.3)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              Join Waitlist →
            </button>
          </form>
        )}

        {/* GitHub fallback */}
        <div style={{ marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#4a4a6a" }}>or</span>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#8888aa",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f0f0ff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8888aa"; }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Follow on GitHub instead
          </a>
        </div>
      </div>
    </section>
  );
}
