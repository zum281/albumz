import { Spinner } from "@/components/ui/spinner";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { Pause } from "lucide-react";
import type { FC } from "react";

// Uneven durations plus negative delays keep the bars out of step from the first frame
const BARS = [
  { duration: "1.3s", delay: "-0.4s" },
  { duration: "0.95s", delay: "-1s" },
  { duration: "1.6s", delay: "-0.2s" },
] as const;

export const AppSidebarPlayerStatus: FC = () => {
  const { status } = usePlayer();
  if (status === PlayerStatus.LOADING) return <Spinner />;
  if (status === PlayerStatus.PAUSED) return <Pause />;
  if (status === PlayerStatus.PLAYING) {
    return (
      <span
        role="img"
        aria-label="Playing"
        className="flex h-4 items-end gap-1"
      >
        {BARS.map(({ duration, delay }) => (
          <span
            key={delay}
            className="h-full w-1 origin-bottom bg-current motion-safe:animate-equalizer"
            style={{ animationDuration: duration, animationDelay: delay }}
          />
        ))}
      </span>
    );
  }
  return null;
};
