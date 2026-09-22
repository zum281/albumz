import { CoverPlaceholder } from "@/components/CoverPlaceholder";
import type { Album } from "@/types/album";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC } from "react";

export const AlbumLibraryCoverCell: FC<AlbumLibraryCoverCellProps> = ({
  album,
}) => {
  return (
    <span className="relative block size-10">
      <span className="absolute top-1 left-4.5 flex size-8 items-center justify-center rounded-full border border-muted-foreground bg-muted">
        <span className="size-2 rounded-full bg-background" />
      </span>
      <span className="relative block size-10">
        {album.cover_path ? (
          <img
            src={convertFileSrc(album.cover_path)}
            alt={`${album.album} cover`}
            className="size-10 object-cover"
          />
        ) : (
          <CoverPlaceholder />
        )}
      </span>
    </span>
  );
};

interface AlbumLibraryCoverCellProps {
  album: Album;
}
