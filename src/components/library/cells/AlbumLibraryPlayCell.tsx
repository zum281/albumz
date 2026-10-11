import { Button } from "@/components/ui/button/button";
import { usePlayer } from "@/hooks/usePlayer";
import type { Album } from "@/types/album";
import { Play } from "lucide-react";
import type { FC } from "react";

export const AlbumLibraryPlayCell: FC<AlbumLibraryPlayCellProps> = ({
  album,
}) => {
  const { playAlbum } = usePlayer();
  const albumPath = album.path;
  if (!albumPath) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="block mx-auto"
      onClick={() => {
        playAlbum(album);
      }}
    >
      <Play className="size-3 fill-current text-muted-foreground" />
    </Button>
  );
};

type AlbumLibraryPlayCellProps = { album: Album };
