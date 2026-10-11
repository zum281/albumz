import type { FC } from "react";
import { Turntable } from "./turntable/Turntable";

export const PlayerIdle: FC = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-7 pt-6">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-hidden border border-border bg-card p-6">
        <p className="text-center font-display text-3xl font-bold tracking-tight text-foreground uppercase">
          Nothing on the turntable
        </p>
        <div className="relative min-h-0 w-full flex-1">
          <Turntable className="absolute inset-0 size-full" />
        </div>
      </div>
    </div>
  );
};
