import { useAudioTime } from "@/hooks/useAudioTime";
import { formatClock } from "@/utils/time";
import type { FC } from "react";
import { PlayerProgress } from "./PlayerProgress";

export const PlayerSeekBar: FC<PlayerSeekBarProps> = ({ duration }) => {
  const elapsed = useAudioTime();

  return (
    <div className="flex flex-col gap-2">
      <PlayerProgress duration={duration} />
      <div className="flex justify-between font-mono text-xs text-muted-foreground">
        <span>{formatClock(elapsed)}</span>
        <span>{formatClock(duration)}</span>
      </div>
    </div>
  );
};

type PlayerSeekBarProps = { duration: number };
