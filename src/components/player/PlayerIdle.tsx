import { randomUnlistenedAlbumQueryOptions } from "@/db/albums";
import { usePlayer } from "@/hooks/usePlayer";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Button } from "../ui/button/button";
import { Turntable } from "./visualizer/turntable/Turntable";

export const PlayerIdle: FC = () => {
  const { playAlbum } = usePlayer();
  const { data: randomAlbum } = useSuspenseQuery(
    randomUnlistenedAlbumQueryOptions(),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col px-7 pt-6 gap-3">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-hidden border border-border bg-card p-6">
        <p className="text-center font-display text-3xl font-bold tracking-tight text-foreground uppercase">
          Nothing on the turntable
        </p>
        <div className="relative min-h-0 w-full flex-1">
          <Turntable className="absolute inset-0 size-full" />
        </div>
      </div>
      <Button
        className="w-fit"
        disabled={!randomAlbum}
        onClick={() => {
          if (randomAlbum) playAlbum(randomAlbum);
        }}
      >
        Play a random album
      </Button>
    </div>
  );
};
