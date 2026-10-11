import { listTracksQueryOptions } from "@/commands/list_tracks";
import { usePlayer } from "@/hooks/usePlayer";
import type { Album } from "@/types/album";
import { PlayerStatus } from "@/types/enums";
import { useSuspenseQuery } from "@tanstack/react-query";
import { convertFileSrc } from "@tauri-apps/api/core";
import { cn } from "cn";
import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import type { FC } from "react";
import { Button } from "../ui/button/button";

export const PlayerActive: FC<PlayerActiveProps> = ({ album }) => {
  const { index, status, pause, resume, stop, next, previous } = usePlayer();
  const { data: tracks } = useSuspenseQuery(listTracksQueryOptions(album));

  const loading = status === PlayerStatus.LOADING;
  const hasCurrent =
    status === PlayerStatus.PLAYING || status === PlayerStatus.PAUSED;
  const current = tracks[index];

  return (
    <div className="flex flex-col gap-7 px-7 pt-6">
      <section className="flex items-end gap-7">
        <div className="size-52 flex-none border border-border bg-muted">
          {album.cover_path && (
            <img
              src={convertFileSrc(album.cover_path)}
              alt={`${album.album} cover`}
              className="size-full object-cover"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Track {index + 1} / {tracks.length}
            </p>
            <h2 className="truncate font-display text-3xl leading-tight font-bold">
              {current.title}
            </h2>
            <p className="truncate text-muted-foreground">
              {album.artist} - {album.album}
            </p>
            <p className="font-mono text-xs tracking-widest">{album.year}</p>
          </div>
          <div className="flex gap-2">
            <Button
              aria-label="Previous track"
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={previous}
            >
              <SkipBack className="fill-current" />
            </Button>
            {status === PlayerStatus.PLAYING ? (
              <Button aria-label="Pause" size="icon" onClick={pause}>
                <Pause className="fill-current" />
              </Button>
            ) : (
              <Button
                aria-label="Play"
                size="icon"
                disabled={loading}
                onClick={resume}
              >
                <Play className="fill-current" />
              </Button>
            )}
            <Button
              aria-label="Stop"
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={stop}
            >
              <Square className="fill-current" />
            </Button>
            <Button
              aria-label="Next track"
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={next}
            >
              <SkipForward className="fill-current" />
            </Button>
          </div>
        </div>
      </section>

      <ol className="flex flex-col">
        {tracks.map((track, i) => (
          <li
            key={track.path}
            className={cn(
              "flex gap-4 border-b border-border px-3 py-2",
              hasCurrent && i === index && "bg-muted font-bold",
            )}
          >
            <span className="w-6 flex-none font-mono text-xs leading-6 tracking-widest text-muted-foreground">
              {String(track.number ?? i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 truncate">{track.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

type PlayerActiveProps = { album: Album };
