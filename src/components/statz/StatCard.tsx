import { cn } from "@/lib/utils";
import type { FC } from "react";

export const StatCard: FC<StatCardProps> = ({ title, data, dataClassName }) => {
  return (
    <div className="bg-card border border-border p-5 gap-2 flex-1">
      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        {title}
      </span>
      <p
        className={cn(
          "font-bold text-5xl tracking-tight leading-none text-foreground",
          dataClassName,
        )}
      >
        {data}
      </p>
    </div>
  );
};

type StatCardProps = {
  title: string;
  data: string | number;
  dataClassName?: string;
};
