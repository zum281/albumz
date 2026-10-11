import { useVisualizer } from "@/hooks/useVisualizer";
import type { FC } from "react";
import { BarsVisualizer } from "./bars/BarsVisualizer";
import { ScopeVisualizer } from "./scope/ScopeVisualizer";
import { TurntableVisualizer } from "./turntable/TurntableVisualizer";

export const Visualizer: FC = () => {
  const { visualizer } = useVisualizer();

  if (visualizer === "bars") return <BarsVisualizer />;
  if (visualizer === "turntable") return <TurntableVisualizer />;
  return <ScopeVisualizer />;
};
