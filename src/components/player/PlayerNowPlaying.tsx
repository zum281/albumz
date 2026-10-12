import type { Album } from "@/types/album";
import type { Track } from "@/types/track";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC } from "react";
import { ViewTransition } from "react";

export const PlayerNowPlaying: FC<PlayerNowPlayingProps> = ({
  album,
  track,
  position,
  total,
}) => {
  return (
    <section className="flex items-center gap-4 sm:gap-5">
      <ViewTransition name="album-cover" share="auto" default="none">
        <div className="size-20 flex-none border border-border bg-muted sm:size-24">
          {album.cover_path && (
            <img
              src={convertFileSrc(album.cover_path)}
              alt={`${album.album} cover`}
              className="size-full object-cover"
            />
          )}
        </div>
      </ViewTransition>
      <div className="min-w-0">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Track {position} / {total}
        </p>
        <h2 className="truncate font-display text-2xl leading-tight font-bold uppercase sm:text-3xl">
          {track.title}
        </h2>
        <p className="truncate text-muted-foreground">
          {album.artist} - {album.album}
        </p>
        <p className="font-mono text-xs tracking-widest">{album.year}</p>
      </div>
    </section>
  );
};

type PlayerNowPlayingProps = {
  album: Album;
  track: Track;
  position: number;
  total: number;
};
