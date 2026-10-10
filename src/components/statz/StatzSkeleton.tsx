import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

const STAT_CARDS = 5;

const GraphCardSkeleton: FC = () => (
  <div className="flex-1 border border-border bg-card p-6">
    <Skeleton className="mb-5 h-6 w-1/2" />
    <Skeleton className="h-20 w-full" />
  </div>
);

export const StatzSkeleton: FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading statz"
      className="flex flex-col gap-7"
    >
      <div className="flex flex-wrap gap-3 px-7">
        {Array.from({ length: STAT_CARDS }, (_, i) => (
          <div key={i} className="flex-1 border border-border bg-card p-5">
            <Skeleton className="mb-3 h-3 w-1/2" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 px-7">
        <GraphCardSkeleton />
        <GraphCardSkeleton />
      </div>
      <div className="flex flex-wrap gap-3 px-7">
        <GraphCardSkeleton />
      </div>
      <div className="flex flex-wrap gap-3 px-7">
        <GraphCardSkeleton />
        <GraphCardSkeleton />
      </div>
    </div>
  );
};
