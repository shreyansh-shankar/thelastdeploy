"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_SECTIONS } from "@/lib/docs-nav";

export default function DocsSidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (href: string) => pathname === href;
  const isSectionActive = (items: { href: string }[]) =>
    items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));

  return (
    <aside className={`docs-sidebar${mobileOpen ? " mobile-open" : ""}`}>
      {mobileOpen && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#6666aa",
            padding: "4px",
          }}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {NAV_SECTIONS.map((section) => {
        const sectionActive = isSectionActive(section.items);
        const isCollapsed = collapsed[section.id] ?? false;

        return (
          <div key={section.id} className="docs-nav-section">
            <button
              className="docs-nav-section-header"
              onClick={() => toggleSection(section.id)}
              type="button"
              style={sectionActive ? { color: "#8888cc" } : undefined}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d={section.icon} />
              </svg>
              <span>{section.title}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginLeft: "auto",
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              className="docs-nav-items"
              style={{ maxHeight: isCollapsed ? "0" : "2000px" }}
            >
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`docs-nav-link${isActive(item.href) ? " active" : ""}`}
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
