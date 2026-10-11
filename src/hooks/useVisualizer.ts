import { VisualizerContext } from "@/context/visualizer/VisualizerContext";
import { use } from "react";

export const useVisualizer = () => {
  const context = use(VisualizerContext);
  if (!context) {
    throw new Error("useVisualizer must be used within a VisualizerContext.");
  }

  return context;
};
