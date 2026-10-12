import { Button } from "@/components/ui/button/button";
import { randomUnlistenedAlbumQueryOptions } from "@/db/albums";
import { usePlayer } from "@/hooks/usePlayer";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Play, RefreshCw } from "lucide-react";
import type { FC } from "react";

export const RandomAlbumPick: FC = () => {
  const queryClient = useQueryClient();
  const { playAlbum } = usePlayer();

  const { data: randomAlbum } = useSuspenseQuery(
    randomUnlistenedAlbumQueryOptions(),
  );

  const reroll = async () => {
    await queryClient.invalidateQueries({
      queryKey: randomUnlistenedAlbumQueryOptions().queryKey,
    });
  };

  if (!randomAlbum) return null;

  return (
    <section className="flex flex-col gap-3 border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Random pick from backlog
        </h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            void reroll();
          }}
        >
          <RefreshCw />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="size-20 flex-none border border-border bg-muted">
          {randomAlbum.cover_path && (
            <img
              src={convertFileSrc(randomAlbum.cover_path)}
              alt={`${randomAlbum.album} cover`}
              className="size-full object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-2xl leading-tight font-bold uppercase">
            {randomAlbum.album}
          </p>
          <p className="truncate text-muted-foreground">
            {randomAlbum.artist} - {randomAlbum.year}
          </p>
        </div>
        <Button
          onClick={() => {
            playAlbum(randomAlbum);
          }}
        >
          <Play className="size-3 fill-current" />
          Play
        </Button>
      </div>
    </section>
  );
};
