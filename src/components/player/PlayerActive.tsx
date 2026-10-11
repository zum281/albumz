import { listTracksQueryOptions } from "@/commands/list_tracks";
import { useAudioTime } from "@/hooks/useAudioTime";
import { usePlayer } from "@/hooks/usePlayer";
import type { Album } from "@/types/album";
import { PlayerStatus } from "@/types/enums";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { PlayerControls } from "./PlayerControls";
import { PlayerNowPlaying } from "./PlayerNowPlaying";
import { PlayerSeekBar } from "./PlayerSeekBar";
import { PlayerTracklist } from "./PlayerTracklist";
import { PlayerVisualizer } from "./PlayerVisualizer";

export const PlayerActive: FC<PlayerActiveProps> = ({ album }) => {
  const { index, status } = usePlayer();
  const { data: tracks } = useSuspenseQuery(listTracksQueryOptions(album));
  const elapsedTime = useAudioTime();

  const currentTrack = tracks[index];

  const isTrackActive =
    status === PlayerStatus.PLAYING || status === PlayerStatus.PAUSED;

  const progress = isTrackActive
    ? Math.min(1, elapsedTime / currentTrack.duration_seconds)
    : null;

  return (
    <div className="grid min-h-0 flex-1 gap-5 px-7 pt-6 lg:grid-cols-3">
      <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">
        <PlayerVisualizer
          spinning={status === PlayerStatus.PLAYING}
          progress={progress}
        />
        <PlayerNowPlaying
          album={album}
          track={currentTrack}
          position={index + 1}
          total={tracks.length}
        />
        <PlayerSeekBar
          elapsed={elapsedTime}
          duration={currentTrack.duration_seconds}
        />
        <PlayerControls />
      </div>
      <PlayerTracklist
        tracks={tracks}
        currentIndex={isTrackActive ? index : -1}
      />
    </div>
  );
};

type PlayerActiveProps = { album: Album };
