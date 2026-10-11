import type { FC } from "react";
import { Turntable } from "./turntable/Turntable";

export const PlayerVisualizer: FC<PlayerVisualizerProps> = ({
  spinning,
  progress,
}) => {
  return (
    <div className="relative min-h-48 flex-1 overflow-hidden border border-border bg-card">
      <Turntable
        className="absolute inset-0 size-full"
        spinning={spinning}
        progress={progress}
      />
    </div>
  );
};

type PlayerVisualizerProps = { spinning: boolean; progress: number | null };
