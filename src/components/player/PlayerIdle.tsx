import type { FC } from "react";

export const PlayerIdle: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-7">
      <p className="font-display text-3xl font-bold tracking-tight text-muted-foreground uppercase">
        Nothing on the turntable
      </p>
    </div>
  );
};
