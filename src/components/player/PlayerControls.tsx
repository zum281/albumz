import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button/button";

export const PlayerControls: FC = () => {
  const { status, pause, resume, stop, next, previous } = usePlayer();
  const loading = status === PlayerStatus.LOADING;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
      <Button
        aria-label="Previous track"
        variant="outline"
        size="icon"
        disabled={loading}
        onClick={previous}
      >
        <SkipBack className="fill-current" />
      </Button>
      {status === PlayerStatus.PLAYING && (
        <Button aria-label="Pause" size="icon-lg" onClick={pause}>
          <Pause className="fill-current" />
        </Button>
      )}
      {status === PlayerStatus.PAUSED && (
        <Button
          aria-label="Play"
          size="icon-lg"
          disabled={loading}
          onClick={resume}
        >
          <Play className="fill-current" />
        </Button>
      )}
      <Button
        aria-label="Next track"
        variant="outline"
        size="icon"
        disabled={loading}
        onClick={next}
      >
        <SkipForward className="fill-current" />
      </Button>
      <Button
        aria-label="Stop"
        variant="outline"
        size="icon"
        disabled={loading}
        onClick={stop}
      >
        <Square className="fill-current" />
      </Button>
    </div>
  );
};
