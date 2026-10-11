import { VISUALIZERS } from "./constants/visualizer";
import type { VisualizerChoice } from "./types/visualizer";

const VISUALIZER_LS_KEY = "albumz-visualizer";

export const loadVisualizer = (): VisualizerChoice => {
  const stored = localStorage.getItem(VISUALIZER_LS_KEY);
  return VISUALIZERS.find(({ value }) => value === stored)?.value ?? "bars";
};

export const saveVisualizer = (choice: VisualizerChoice): void => {
  localStorage.setItem(VISUALIZER_LS_KEY, choice);
};
