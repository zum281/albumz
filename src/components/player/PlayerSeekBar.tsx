import { formatClock } from "@/utils/time";
import type { FC } from "react";
import { Progress } from "../ui/progress";

export const PlayerSeekBar: FC<PlayerSeekBarProps> = ({
  elapsed,
  duration,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Progress value={duration > 0 ? (elapsed / duration) * 100 : 0} />
      <div className="flex justify-between font-mono text-xs text-muted-foreground">
        <span>{formatClock(elapsed)}</span>
        <span>{formatClock(duration)}</span>
      </div>
    </div>
  );
};

type PlayerSeekBarProps = { elapsed: number; duration: number };
