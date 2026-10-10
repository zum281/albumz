import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { FC } from "react";

export const GraphSkeleton: FC<GraphSkeletonProps> = ({ className }) => {
  return (
    <Skeleton
      role="status"
      aria-label="Loading graph"
      aria-hidden={false}
      className={cn("h-40 w-full", className)}
    />
  );
};

type GraphSkeletonProps = { className?: string };
