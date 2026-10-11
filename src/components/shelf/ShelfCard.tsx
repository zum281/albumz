import { Button } from "@/components/ui/button/button";
import type { Album } from "@/types/album";
import { convertFileSrc } from "@tauri-apps/api/core";
import { openPath } from "@tauri-apps/plugin-opener";
import { cn } from "cn";
import { Play } from "lucide-react";
import type { FC } from "react";

// Full class names so Tailwind can see them statically
const COVER_FALLBACK_COLORS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
] as const;

export const ShelfCard: FC<ShelfCardProps> = ({ album }) => {
  // Derived from the id so the color stays stable across re-renders
  const fallbackColor =
    COVER_FALLBACK_COLORS[album.id % COVER_FALLBACK_COLORS.length];

  return (
    <article className="w-60 flex-none">
      <div className="relative aspect-square w-52">
        <span
          aria-hidden
          className="absolute inset-y-[6%] -right-8 aspect-square rounded-full border border-muted-foreground bg-muted"
        />
        <div
          className={cn(
            "relative size-full border border-border",
            album.cover_path ? "bg-muted" : fallbackColor,
          )}
        >
          {album.cover_path && (
            <img
              src={convertFileSrc(album.cover_path)}
              alt={`${album.album} cover`}
              className="size-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between w-52 gap-3">
        <div className="min-w-0">
          <h3 className="mt-4 truncate text-lg font-bold leading-tight">
            {album.album}
          </h3>
          <p className="truncate text-muted-foreground leading-tight mb-1">
            {album.artist}
          </p>
          <p className="font-mono text-xs tracking-widest text-foreground drop-shadow">
            {album.year}
          </p>
        </div>
        {album.path && (
          <Button
            aria-label={`Play ${album.album}`}
            onClick={() => {
              void openPath(album.path ?? "", "Music");
            }}
            size="icon"
          >
            <Play className="size-4 fill-current" />
          </Button>
        )}
      </div>
    </article>
  );
};

type ShelfCardProps = { album: Album };
