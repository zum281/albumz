import type { FC } from "react";
import { Progress } from "../ui/progress";

export const AppSidebarListenedProgress: FC<
  AppSidebarListenedProgressProps
> = ({ listened, total, percentage }) => {
  return (
    <div className="flex flex-col gap-2 px-2 pb-3 group-data-[collapsible=icon]:hidden">
      <div className="flex items-baseline justify-between gap-2 font-mono text-xs">
        <span className="tracking-widest text-muted-foreground uppercase">
          Listened
        </span>
        <span className="text-chart-2">
          {listened} / {total}
        </span>
      </div>
      <div className="h-1 bg-muted">
        <Progress value={percentage} />
      </div>
    </div>
  );
};

type AppSidebarListenedProgressProps = {
  listened: number;
  total: number;
  percentage: number;
};
