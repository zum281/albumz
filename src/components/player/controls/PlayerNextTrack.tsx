import { Button } from "@/components/ui/button/button";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { SkipForward } from "lucide-react";
import type { FC } from "react";

export const PlayerNextTrack: FC = () => {
  const { status, next } = usePlayer();
  const loading = status === PlayerStatus.LOADING;

  return (
    <Button
      aria-label="Next track"
      variant="outline"
      size="icon"
      disabled={loading}
      onClick={next}
    >
      <SkipForward className="fill-current" />
    </Button>
  );
};
