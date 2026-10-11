import { PlayerEqualizer } from "@/components/player/PlayerEqualizer";
import { Spinner } from "@/components/ui/spinner";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { Pause } from "lucide-react";
import type { FC } from "react";

export const AppSidebarPlayerStatus: FC = () => {
  const { status } = usePlayer();
  if (status === PlayerStatus.LOADING) return <Spinner />;
  if (status === PlayerStatus.PAUSED) return <Pause />;
  if (status === PlayerStatus.PLAYING) {
    return (
      <PlayerEqualizer
        className="h-4 gap-1"
        barClassName="w-1 group-hover/menu-button:motion-safe:animate-equalizer group-focus-visible/menu-button:motion-safe:animate-equalizer"
      />
    );
  }
  return null;
};
