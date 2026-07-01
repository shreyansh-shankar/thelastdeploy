interface BadgeProps {
  variant: "available" | "coming-soon" | "beta" | "new";
  children: React.ReactNode;
}

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`docs-badge ${variant}`}>{children}</span>
  );
}
