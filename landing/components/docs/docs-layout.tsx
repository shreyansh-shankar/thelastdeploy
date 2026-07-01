"use client";

import { useState } from "react";
import DocsSidebar from "./sidebar";
import DocsNavbar from "./docs-navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="docs-root">
      <DocsNavbar onMenuOpen={() => setMobileMenuOpen(true)} />
      <div className="docs-body">
        <DocsSidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        {children}
      </div>
    </div>
  );
}
