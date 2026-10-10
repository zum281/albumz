import type { FC, ReactNode } from "react";
import { Boundaries } from "../Boundaries";
import { ErrorSmall } from "../errors/ErrorSmall";

export const RouteHeader: FC<RouteHeaderProps> = ({ title, rightElement }) => {
  return (
    <header className="sticky top-0 z-5 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b-6 border-primary bg-background/93 p-7 backdrop-blur-sm dark:border-border amoled:border-border">
      <h1 className="font-display text-4xl leading-none font-bold tracking-tight uppercase">
        {title}
      </h1>
      {!!rightElement && (
        <div className="flex gap-[1ch] ml-auto text-right font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <Boundaries getResetKey={() => "route-header"} error={ErrorSmall}>
            <span>[</span>
            {rightElement}
            <span>]</span>
          </Boundaries>
        </div>
      )}
    </header>
  );
};

type RouteHeaderProps = { title: string; rightElement?: ReactNode };
