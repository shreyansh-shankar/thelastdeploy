// web/frontend/components/shared/page-header.tsx

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-muted-foreground max-w-xl">{description}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}