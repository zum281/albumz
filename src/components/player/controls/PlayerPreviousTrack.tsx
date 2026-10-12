import { Button } from "@/components/ui/button/button";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { SkipBack } from "lucide-react";
import type { FC } from "react";

export const PlayerPreviousTrack: FC = () => {
  const { status, previous } = usePlayer();
  const loading = status === PlayerStatus.LOADING;

  return (
    <Button
      aria-label="Previous track"
      variant="outline"
      size="icon"
      disabled={loading}
      onClick={previous}
    >
      <SkipBack className="fill-current" />
    </Button>
  );
};
