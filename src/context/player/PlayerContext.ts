import { createContext } from "react";
import type { PlayerContextType } from "./PlayerContext.types";

export const PlayerContext = createContext<PlayerContextType | null>(null);
