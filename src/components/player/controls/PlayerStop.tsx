import { Button } from "@/components/ui/button/button";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { Square } from "lucide-react";
import type { FC } from "react";

export const PlayerStop: FC = () => {
  const { status, stop } = usePlayer();
  const loading = status === PlayerStatus.LOADING;

  return (
    <Button
      aria-label="Stop"
      variant="outline"
      size="icon"
      disabled={loading}
      onClick={stop}
    >
      <Square className="fill-current" />
    </Button>
  );
};
