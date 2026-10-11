import type { VisualizerChoice } from "@/types/visualizer";

export type VisualizerContextType = {
  visualizer: VisualizerChoice;
  updateVisualizer: (visualizer: VisualizerChoice | null) => void;
};
