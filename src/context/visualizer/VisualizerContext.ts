import { createContext } from "react";
import type { VisualizerContextType } from "./VisualizerContext.types";

export const VisualizerContext = createContext<VisualizerContextType | null>(
  null,
);
