import type { Track } from "@/types/track";
import { formatClock } from "@/utils/time";
import { cn } from "cn";
import { Play } from "lucide-react";
import type { FC } from "react";
import { PlayerEqualizer } from "./PlayerEqualizer";

export const PlayerTracklistItem: FC<PlayerTracklistItemProps> = ({
  track,
  position,
  isCurrent,
  isPlaying,
  onSelect,
}) => (
  <li
    aria-current={isCurrent}
    className={cn(
      "border-b border-border last:border-b-0",
      isCurrent && "bg-muted font-bold",
    )}
  >
    <button
      type="button"
      disabled={isPlaying}
      onClick={onSelect}
      className="group flex w-full items-center gap-4 px-4 py-2 text-left transition-colors duration-200 ease-out enabled:cursor-pointer enabled:hover:bg-muted motion-reduce:transition-none"
    >
      <span className="relative w-6 flex-none font-mono text-xs tracking-widest text-muted-foreground">
        {isPlaying ? (
          <PlayerEqualizer
            className="h-3 gap-0.5 text-foreground"
            barClassName="w-0.5 group-hover:motion-safe:animate-equalizer"
          />
        ) : (
          <>
            <span className="inline-block transition-[opacity,scale] duration-200 ease-out group-hover:scale-75 group-hover:opacity-0 motion-reduce:transition-none">
              {String(position).padStart(2, "0")}
            </span>
            <Play
              aria-hidden
              className="absolute inset-y-0 left-0 my-auto size-3 scale-50 fill-current opacity-0 transition-[opacity,scale] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
            />
          </>
        )}
      </span>
      <span className="min-w-0 flex-1 truncate">{track.title}</span>
      <span className="font-mono text-xs text-muted-foreground">
        {formatClock(track.duration_seconds)}
      </span>
    </button>
  </li>
);

type PlayerTracklistItemProps = {
  track: Track;
  position: number;
  isCurrent: boolean;
  isPlaying: boolean;
  onSelect: () => void;
};
