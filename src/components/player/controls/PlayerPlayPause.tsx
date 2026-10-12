import { Button } from "@/components/ui/button/button";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { Pause, Play } from "lucide-react";
import type { FC } from "react";

export const PlayerPlayPause: FC = () => {
  const { status, resume, pause } = usePlayer();
  const loading = status === PlayerStatus.LOADING;

  if (status === PlayerStatus.PLAYING)
    return (
      <Button aria-label="Pause" size="icon-lg" onClick={pause}>
        <Pause className="fill-current" />
      </Button>
    );

  return (
    <Button
      aria-label="Play"
      size="icon-lg"
      disabled={loading}
      onClick={resume}
    >
      <Play className="fill-current" />
    </Button>
  );
};
