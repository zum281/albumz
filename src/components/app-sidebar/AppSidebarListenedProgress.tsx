import type { FC } from "react";

export const AppSidebarListenedProgress: FC<
  AppSidebarListenedProgressProps
> = ({ listened, total }) => {
  return (
    <div className="flex flex-col gap-1.5 px-2.5 pb-3 group-data-[collapsible=icon]:hidden">
      <div className="flex items-baseline justify-between gap-2 font-mono text-xs">
        <span className="tracking-widest text-muted-foreground uppercase">
          Listened
        </span>
        <span className="text-chart-2">
          {listened} / {total}
        </span>
      </div>
      <div className="h-1 bg-muted">
        <div className="h-full w-[3%] bg-chart-2" />
      </div>
    </div>
  );
};

interface AppSidebarListenedProgressProps {
  listened: number;
  total: number;
}
