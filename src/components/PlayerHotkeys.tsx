import { usePlayerHotkeys } from "@/hooks/usePlayerHotkeys";
import type { FC } from "react";

export const PlayerHotkeys: FC = () => {
  usePlayerHotkeys();
  return null;
};
