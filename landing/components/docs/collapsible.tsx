"use client";

import { useState } from "react";

interface CollapsibleProps {
  trigger: string;
  children: React.ReactNode;
}

export default function Collapsible({ trigger, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="docs-collapsible">
      <button
        className={`docs-collapsible-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{trigger}</span>
        <svg
          className="docs-collapsible-chevron"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`docs-collapsible-body${open ? " open" : ""}`}>
        <div className="docs-collapsible-body-inner">{children}</div>
      </div>
    </div>
  );
}
