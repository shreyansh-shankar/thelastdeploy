"use client";

import { useEffect, useState, useRef } from "react";
import type { TocEntry } from "@/lib/docs-content/types";

interface OnPageTocProps {
  entries: TocEntry[];
}

export default function OnPageToc({ entries }: OnPageTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!entries.length) return;

    const observer = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );

    entries.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  if (!entries.length) return null;

  return (
    <div className="docs-toc">
      <div className="docs-toc-label">On this page</div>
      <ul className="docs-toc-list">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`docs-toc-item${entry.level === 3 ? " h3" : ""}${activeId === entry.id ? " active" : ""}`}
          >
            <a
              href={`#${entry.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth" });
                setActiveId(entry.id);
              }}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
