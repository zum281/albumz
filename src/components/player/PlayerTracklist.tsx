import { usePlayer } from "@/hooks/usePlayer";
import type { Track } from "@/types/track";
import { formatClock, secondsToMinutes } from "@/utils/time";
import { cn } from "cn";
import type { FC } from "react";

export const PlayerTracklist: FC<PlayerTracklistProps> = ({
  tracks,
  currentIndex,
}) => {
  const { album } = usePlayer();

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
            <li
              key={track.path}
              aria-current={i === currentIndex}
              className={cn(
                "flex items-center gap-4 border-b border-border px-4 py-2 last:border-b-0",
                i === currentIndex && "bg-muted font-bold",
              )}
            >
              {/* TODO: should be clickable to select track */}
              <span className="w-6 flex-none font-mono text-xs tracking-widest text-muted-foreground">
                {String(track.number ?? i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 truncate">{track.title}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {formatClock(track.duration_seconds)}
              </span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
};

type PlayerTracklistProps = { tracks: Track[]; currentIndex: number };
