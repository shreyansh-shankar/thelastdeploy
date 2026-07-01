import type { Metadata } from "next";
import DocsLayout from "@/components/docs/docs-layout";

export const metadata: Metadata = {
  title: {
    template: "%s — TLD Docs",
    default: "The Last Deploy — Documentation",
  },
  description:
    "Official documentation for The Last Deploy — an open-source DevOps learning platform.",
  openGraph: {
    title: "The Last Deploy Docs",
    description: "Official documentation for The Last Deploy.",
    siteName: "TLD Docs",
  },
};

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
