import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import type { Track } from "@/types/track";
import { secondsToMinutes } from "@/utils/time";
import type { FC } from "react";
import { PlayerTracklistItem } from "./PlayerTracklistItem";

export const PlayerTracklist: FC<PlayerTracklistProps> = ({
  tracks,
  currentIndex,
}) => {
  const { album, status, index, selectTrack, resume } = usePlayer();

  if (!album) return null;

  return (
    <div className="relative lg:self-stretch">
      <aside
        aria-label="Tracklist"
        className="flex max-h-dvh flex-col border border-border bg-card lg:absolute lg:inset-0 lg:max-h-none"
      >
        <header className="flex flex-col gap-1 border-b border-border px-4 py-3">
          <h3 className="font-display text-xl font-bold tracking-tight uppercase">
            Tracklist
          </h3>
          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            {tracks.length} tracks · {secondsToMinutes(album.duration_seconds)}{" "}
            min
          </p>
        </header>
        <ol className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {tracks.map((track, i) => (
            <PlayerTracklistItem
              key={track.path}
              track={track}
              position={track.number ?? i + 1}
              isCurrent={i === currentIndex}
              isPlaying={status === PlayerStatus.PLAYING && i === index}
              onSelect={() => {
                if (status === PlayerStatus.PAUSED && i === index) resume();
                else selectTrack(i);
              }}
            />
          ))}
        </ol>
      </aside>
    </div>
  );
};

type PlayerTracklistProps = { tracks: Track[]; currentIndex: number };
