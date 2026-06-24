"use client";

import { SOCIAL_LINKS } from "@/lib/constants";

const socials = [
  {
    name: "GitHub",
    href: SOCIAL_LINKS.github,
    handle: "@thelastdeploy",
    description: "Follow the codebase, open issues, contribute",
    accent: "#f0f0ff",
    bg: "rgba(240,240,255,0.04)",
    border: "rgba(240,240,255,0.08)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: SOCIAL_LINKS.youtube,
    handle: "@thelastdeploy",
    description: "DevOps walkthroughs & build-in-public vlogs",
    accent: "#f87171",
    bg: "rgba(248,113,113,0.05)",
    border: "rgba(248,113,113,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    handle: "@thelastdeploy",
    description: "Behind-the-scenes & DevOps content",
    accent: "#e879f9",
    bg: "rgba(232,121,249,0.05)",
    border: "rgba(232,121,249,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

export default function Community() {
  return (
    <section
      className="section-divider"
      style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "200px",
        background: "radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span className="section-badge" style={{
              borderColor: "rgba(168,85,247,0.25)",
              background: "rgba(168,85,247,0.06)",
              color: "#c084fc",
            }}>
              Community
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            Follow the journey
          </h2>
          <p style={{ fontSize: "18px", color: "#8888aa", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
            We build in public. Watch, star, subscribe, and become part of it.
          </p>
        </div>

        {/* Social cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "24px",
                borderRadius: "16px",
                background: social.bg,
                border: `1px solid ${social.border}`,
                backdropFilter: "blur(12px)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 0 20px ${social.bg}, 0 16px 32px rgba(0,0,0,0.3)`;
                el.style.borderColor = social.accent + "35";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "none";
                el.style.boxShadow = "none";
                el.style.borderColor = social.border;
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ color: social.accent }}>
                  {social.icon}
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a4a6a" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f0f0ff", marginBottom: "4px" }}>
                  {social.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#4a4a6a", fontFamily: "JetBrains Mono, monospace", marginBottom: "8px" }}>
                  {social.handle}
                </p>
                <p style={{ fontSize: "13px", color: "#6a6a8a", lineHeight: 1.5 }}>
                  {social.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
