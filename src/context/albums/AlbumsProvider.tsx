import { albumsQueryOptions } from "@/db/albums";
import type { Album } from "@/types/album";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import { AlbumsContext } from "./AlbumsContext";
import type { AlbumsContextType } from "./AlbumsContext.types";

export const AlbumsProvider: FC<AlbumsProviderProps> = ({ children }) => {
  const { data: albums } = useSuspenseQuery(albumsQueryOptions());
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(albums);

  const maxAlbumYear: number = useMemo(() => {
    return Math.max(...albums.map((a) => a.year));
  }, [albums]);

  const minAlbumYear: number = useMemo(() => {
    return Math.min(...albums.map((a) => a.year));
  }, [albums]);

  const value: AlbumsContextType = useMemo(
    () => ({
      albums,
      minAlbumYear,
      maxAlbumYear,
      filteredAlbums,
      updateFilteredAlbums: setFilteredAlbums,
    }),
    [minAlbumYear, maxAlbumYear, filteredAlbums, albums],
  );

  return <AlbumsContext value={value}>{children}</AlbumsContext>;
};

type AlbumsProviderProps = PropsWithChildren;
