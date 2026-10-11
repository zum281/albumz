import { PlayerContext } from "@/context/player/PlayerContext";
import { use } from "react";

export const usePlayer = () => {
  const context = use(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerContext.");
  }

  return context;
};
