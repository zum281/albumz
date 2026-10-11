import { loadVisualizer, saveVisualizer } from "@/visualizer";
import type { FC } from "react";
import { useState } from "react";
import { BarsVisualizer } from "./bars/BarsVisualizer";
import { TurntableVisualizer } from "./turntable/TurntableVisualizer";
import { VisualizerSwitcher } from "./VisualizerSwitcher";

export const PlayerVisualizerPanel: FC = () => {
  const [visualizer, setVisualizer] = useState(loadVisualizer);

  return (
    <div className="relative flex h-[clamp(15rem,44vh,27.5rem)] flex-col">
      {visualizer === "bars" ? <BarsVisualizer /> : <TurntableVisualizer />}
      <VisualizerSwitcher
        value={visualizer}
        onChange={(next) => {
          setVisualizer(next);
          saveVisualizer(next);
        }}
      />
    </div>
  );
};
