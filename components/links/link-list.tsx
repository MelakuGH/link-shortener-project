import Link from "next/link";

interface LinkListProps {
  links: Array<{
    id: number;
    shortCode: string;
    originalUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export function LinkList({ links }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
        No links yet. Create your first short link above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              <Link href={`/api/links/${link.shortCode}`} className="text-primary underline-offset-4 hover:underline">
                /{link.shortCode}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground break-all">{link.originalUrl}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Created {new Date(link.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
