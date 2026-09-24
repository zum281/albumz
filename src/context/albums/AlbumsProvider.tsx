import type { Album } from "@/types/album";
import type { FC, PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import { AlbumsContext } from "./AlbumsContext";
import type { AlbumsContextType } from "./AlbumsContext.types";

export const AlbumsProvider: FC<AlbumsProviderProps> = ({
  albums,
  children,
}) => {
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(albums);

  const maxAlbumYear: number = useMemo(() => {
    return Math.max(...albums.map((a) => a.year));
  }, [albums]);

  const minAlbumYear: number = useMemo(() => {
    return Math.min(...albums.map((a) => a.year));
  }, [albums]);

  const value: AlbumsContextType = useMemo(
    () => ({
      minAlbumYear,
      maxAlbumYear,
      filteredAlbums,
      updateFilteredAlbums: setFilteredAlbums,
    }),
    [minAlbumYear, maxAlbumYear, filteredAlbums],
  );

  return <AlbumsContext value={value}>{children}</AlbumsContext>;
};

type AlbumsProviderProps = PropsWithChildren<{ albums: Album[] }>;
