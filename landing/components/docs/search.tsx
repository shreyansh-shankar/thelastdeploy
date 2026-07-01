"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { ALL_NAV_ITEMS } from "@/lib/docs-nav";

const fuse = new Fuse(ALL_NAV_ITEMS, {
  keys: ["title", "description", "section"],
  threshold: 0.3,
  includeScore: true,
});

interface SearchProps {
  isSubdomain: boolean;
  onClose: () => void;
}

export default function DocsSearch({ isSubdomain, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof ALL_NAV_ITEMS>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const getHref = (href: string) => (isSubdomain ? href : `/docs${href}`);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const hits = fuse.search(query).slice(0, 8).map((r) => r.item);
    setResults(hits);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[selectedIndex]) {
        router.push(getHref(results[selectedIndex].href));
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="docs-search-overlay" onClick={onClose}>
      <div className="docs-search-box" onClick={(e) => e.stopPropagation()}>
        <div className="docs-search-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a3a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="docs-search-input"
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3a3a5a", padding: "0" }}
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="docs-search-results">
          {results.length > 0 ? (
            results.map((item, i) => (
              <a
                key={item.href}
                href={getHref(item.href)}
                className={`docs-search-result${i === selectedIndex ? " selected" : ""}`}
                onClick={onClose}
              >
                <span className="docs-search-result-section">{item.section}</span>
                <span className="docs-search-result-title">{item.title}</span>
                {item.description && (
                  <span className="docs-search-result-desc">{item.description}</span>
                )}
              </a>
            ))
          ) : query ? (
            <div className="docs-search-empty">No results for &ldquo;{query}&rdquo;</div>
          ) : (
            <div className="docs-search-empty">Type to search the docs...</div>
          )}
        </div>

        <div className="docs-search-footer">
          <span className="docs-search-hint">
            <kbd className="docs-search-kbd">↑↓</kbd> navigate
          </span>
          <span className="docs-search-hint">
            <kbd className="docs-search-kbd">↵</kbd> select
          </span>
          <span className="docs-search-hint">
            <kbd className="docs-search-kbd">Esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
