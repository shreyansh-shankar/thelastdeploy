"use client";

import { useState } from "react";
import DocsSidebar from "./sidebar";
import DocsNavbar from "./docs-navbar";

export default function DocsLayout({ children, isSubdomain }: { children: React.ReactNode; isSubdomain: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="docs-root">
      <DocsNavbar isSubdomain={isSubdomain} onMenuOpen={() => setMobileMenuOpen(true)} />
      <div className="docs-body">
        <DocsSidebar
          isSubdomain={isSubdomain}
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        {children}
      </div>
    </div>
  );
}
