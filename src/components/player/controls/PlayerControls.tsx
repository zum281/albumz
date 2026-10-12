import { type FC } from "react";
import { PlayerNextTrack } from "./PlayerNextTrack";
import { PlayerPlayPause } from "./PlayerPlayPause";
import { PlayerPreviousTrack } from "./PlayerPreviousTrack";
import { PlayerStop } from "./PlayerStop";
import { PlayerVolume } from "./PlayerVolume";

export const PlayerControls: FC = () => {
  return (
    <div className="@container border-t border-border pt-4">
      <div className="grid justify-items-center gap-3 @xl:grid-cols-[1fr_auto_1fr] @xl:items-center @xl:gap-2">
        <div className="flex items-center gap-2 @xl:col-start-2">
          <PlayerPreviousTrack />
          <PlayerPlayPause />
          <PlayerNextTrack />
          <PlayerStop />
        </div>
        <PlayerVolume />
      </div>
    </div>
  );
};
