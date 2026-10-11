import type { VisualizerChoice } from "@/types/visualizer";

export const VISUALIZERS: { value: VisualizerChoice; label: string }[] = [
  { value: "bars", label: "Bars" },
  { value: "turntable", label: "Turntable" },
  { value: "scope", label: "Scope" },
];
