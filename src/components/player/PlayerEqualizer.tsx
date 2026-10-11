import { EQUALIZER_BARS } from "@/constants/equalizer";
import { cn } from "cn";
import type { FC } from "react";

export const PlayerEqualizer: FC<PlayerEqualizerProps> = ({
  className,
  barClassName,
}) => (
  <span
    role="img"
    aria-label="Playing"
    className={cn("flex items-end", className)}
  >
    {EQUALIZER_BARS.map(({ duration, delay, rest }) => (
      <span
        key={delay}
        className={cn("h-full origin-bottom bg-current", barClassName)}
        style={{
          transform: `scaleY(${rest})`,
          animationDuration: duration,
          animationDelay: delay,
        }}
      />
    ))}
  </span>
);

type PlayerEqualizerProps = { className?: string; barClassName?: string };
