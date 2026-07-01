import type { Metadata } from "next";
import { headers } from "next/headers";
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

export default async function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isSubdomain = host.startsWith("docs.") || host.includes("docs.localhost");

  return <DocsLayout isSubdomain={isSubdomain}>{children}</DocsLayout>;
}
