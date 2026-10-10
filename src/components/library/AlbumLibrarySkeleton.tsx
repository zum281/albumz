import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

const ROWS = 6;

export const AlbumLibrarySkeleton: FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading library"
      className="flex flex-col gap-4 px-7 pt-6 pb-10"
    >
      <div className="flex flex-wrap items-stretch gap-3">
        <Skeleton className="h-10 min-w-48 flex-1" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="border border-border bg-background">
        <div className="border-b border-border p-4">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: ROWS }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border p-4 last:border-b-0"
          >
            <Skeleton className="size-10 shrink-0" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};
