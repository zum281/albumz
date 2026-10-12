import { audio } from "@/context/player/audio";
import { useAudioTime } from "@/hooks/useAudioTime";
import { Progress } from "@base-ui/react";
import type { FC, MouseEvent } from "react";

export const PlayerProgress: FC<PlayerProgressProps> = ({ duration }) => {
  const elapsed = useAudioTime();
  const progressValue = duration > 0 ? (elapsed / duration) * 100 : 0;

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    audio.currentTime = fraction * duration;
  };
  return (
    <Progress.Root
      value={progressValue}
      data-slot="progress"
      className="flex flex-wrap gap-3"
      onClick={handleSeek}
    >
      <Progress.Track
        className="relative flex h-4 w-full items-center overflow-x-hidden rounded-none bg-muted"
        data-slot="progress-track"
      >
        <Progress.Indicator
          data-slot="progress-indicator"
          className="h-full bg-primary transition-all"
        />
      </Progress.Track>
    </Progress.Root>
  );
};

type PlayerProgressProps = { duration: number };
