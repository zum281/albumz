import { Boundaries } from "@/components/Boundaries";
import { ErrorLargeWithRetry } from "@/components/errors/ErrorLargeWithRetry";
import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderStatz } from "@/components/route-header/RouteHeaderData";
import { BacklogLeaders } from "@/components/statz/graphs/backlog-leaders/BacklogLeaders";
import { DecadeBreakdown } from "@/components/statz/graphs/decade-breakdown/DecadeBreakdown";
import { HeavyRotation } from "@/components/statz/graphs/heavy-rotation/HeavyRotation";
import { PlayProgress } from "@/components/statz/graphs/play-progress/PlayProgress";
import { Verdicts } from "@/components/statz/graphs/verdicts/Verdicts";
import { StatzOverview } from "@/components/statz/StatzOverview";
import { StatzSkeleton } from "@/components/statz/StatzSkeleton";
import { AlbumsStatzProvider } from "@/context/albums-statz/AlbumsStatzProvider";
import type { FC } from "react";

export const Statz: FC = () => {
  return (
    <main className="flex min-w-0 flex-1 flex-col gap-7 pb-7">
      <RouteHeader title="Statz" rightElement={<RouteHeaderStatz />} />
      <Boundaries
        getResetKey={() => "statz-albums-provider"}
        error={ErrorLargeWithRetry}
        loader={<StatzSkeleton />}
      >
        <AlbumsStatzProvider>
          <StatzOverview />
          <div className="px-7 flex flex-wrap gap-3">
            <PlayProgress />
            <BacklogLeaders />
          </div>

          <div className="px-7 flex flex-wrap gap-3">
            <DecadeBreakdown />
          </div>

          <div className="px-7 flex flex-wrap gap-3">
            <Verdicts />
            <HeavyRotation />
          </div>
        </AlbumsStatzProvider>
      </Boundaries>
    </main>
  );
};
