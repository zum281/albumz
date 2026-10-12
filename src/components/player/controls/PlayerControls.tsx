import type { FC } from "react";
import { PlayerNextTrack } from "./PlayerNextTrack";
import { PlayerPlayPause } from "./PlayerPlayPause";
import { PlayerPreviousTrack } from "./PlayerPreviousTrack";
import { PlayerStop } from "./PlayerStop";

export const PlayerControls: FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
      <PlayerPreviousTrack />
      <PlayerPlayPause />
      <PlayerNextTrack />
      <PlayerStop />
    </div>
  );
};
