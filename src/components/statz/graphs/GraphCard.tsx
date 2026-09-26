import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import type { FC, PropsWithChildren } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraphCard: FC<GraphCardProps> = ({ title, children }) => {
  return (
    <div className="grid place-items-center gap-7 border border-border p-6 bg-card flex-1">
      <h2 className="uppercase text-2xl font-bold tracking-tight text-center self-start">
        {title}
      </h2>
      {children}
    </div>
  );
};

type GraphCardProps = PropsWithChildren<{ title: string }>;
