import { Boundaries } from "@/components/Boundaries";
import { ErrorLargeWithRetry } from "@/components/errors/ErrorLargeWithRetry";
import { PlayerActive } from "@/components/player/PlayerActive";
import { PlayerIdle } from "@/components/player/player-idle/PlayerIdle";
import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderPlayer } from "@/components/route-header/RouteHeaderPlayer";
import { usePlayer } from "@/hooks/usePlayer";
import type { FC } from "react";
import { ViewTransition } from "react";

export const Player: FC = () => {
  const { album } = usePlayer();

  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Player" rightElement={<RouteHeaderPlayer />} />
      <Boundaries getResetKey={() => "player"} error={ErrorLargeWithRetry}>
        {album && (
          <ViewTransition
            enter="player-enter"
            exit="player-exit"
            default="none"
          >
            <PlayerActive album={album} />
          </ViewTransition>
        )}
      </Boundaries>
      {!album && (
        <ViewTransition enter="player-enter" exit="player-exit" default="none">
          <PlayerIdle />
        </ViewTransition>
      )}
    </main>
  );
};
