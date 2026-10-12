import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

export const RandomAlbumPickSkeleton: FC = () => {
  return (
    <section
      role="status"
      aria-label="Loading random pick"
      className="flex flex-col gap-3 border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="size-8" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 flex-none" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </section>
  );
};
