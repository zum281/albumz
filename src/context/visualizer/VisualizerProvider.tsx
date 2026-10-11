import type { VisualizerChoice } from "@/types/visualizer";
import { loadVisualizer, saveVisualizer } from "@/visualizer";
import type { FC, PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import { VisualizerContext } from "./VisualizerContext";

export const VisualizerProvider: FC<VisualizerProviderProps> = ({
  children,
}) => {
  const [visualizer, setVisualizer] = useState(loadVisualizer);

  const updateVisualizer = (newVis: VisualizerChoice | null) => {
    if (newVis === null) return;
    setVisualizer(newVis);
    saveVisualizer(newVis);
  };

  const value = useMemo(() => ({ visualizer, updateVisualizer }), [visualizer]);

  return <VisualizerContext value={value}>{children}</VisualizerContext>;
};

type VisualizerProviderProps = PropsWithChildren;
