import Link from "next/link";

interface PrevNextNavProps {
  isSubdomain: boolean;
  prev: { title: string; href: string; section: string } | null;
  next: { title: string; href: string; section: string } | null;
}

export default function PrevNextNav({ isSubdomain, prev, next }: PrevNextNavProps) {
  const getHref = (href: string) => (isSubdomain ? href : `/docs${href}`);

  return (
    <div className="docs-prev-next">
      {prev ? (
        <Link href={getHref(prev.href)} className="docs-prev-next-link">
          <span className="docs-prev-next-dir">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", marginRight: "4px" }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Previous
          </span>
          <span className="docs-prev-next-title">{prev.title}</span>
          <span style={{ fontSize: "11px", color: "#3a3a5a" }}>{prev.section}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={getHref(next.href)} className="docs-prev-next-link next">
          <span className="docs-prev-next-dir">
            Next
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", marginLeft: "4px" }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
          <span className="docs-prev-next-title">{next.title}</span>
          <span style={{ fontSize: "11px", color: "#3a3a5a" }}>{next.section}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
