import { Boundaries } from "@/components/Boundaries";
import { ErrorLargeWithRetry } from "@/components/errors/ErrorLargeWithRetry";
import { PlayerActive } from "@/components/player/PlayerActive";
import { PlayerIdle } from "@/components/player/PlayerIdle";
import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderPlayer } from "@/components/route-header/RouteHeaderPlayer";
import { usePlayer } from "@/hooks/usePlayer";
import type { FC } from "react";

export const Player: FC = () => {
  const { album } = usePlayer();

  if (!album) return <PlayerIdle />;

  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Library" rightElement={<RouteHeaderPlayer />} />
      <Boundaries getResetKey={() => "player"} error={ErrorLargeWithRetry}>
        <PlayerActive album={album} />
      </Boundaries>
    </main>
  );
};
