import type { FC, PropsWithChildren } from "react";

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
