import {
  listenedAlbumsCountQueryOptions,
  listenedAlbumsDurationQueryOptions,
  totalAlbumsDurationQueryOptions,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { getListenedAlbumsPercentage } from "@/utils/album";
import { useQuery } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { AlbumsStatzContext } from "./AlbumsStatzContext";
import type { AlbumsStatzContextType } from "./AlbumsStatzContext.types";

export const AlbumsStatzProvider: FC<AlbumsStatzProviderProps> = ({
  albums,
  children,
}) => {
  const { data: listenedAlbumsCount = 0 } = useQuery(
    listenedAlbumsCountQueryOptions(),
  );
  const { data: totalAlbumsDuration = 0 } = useQuery(
    totalAlbumsDurationQueryOptions(),
  );
  const { data: listenedAlbumsDuration = 0 } = useQuery(
    listenedAlbumsDurationQueryOptions(),
  );

  const totalAlbumsCount = albums.length;
  const backlogAlbumsCount = totalAlbumsCount - listenedAlbumsCount;

  const percentageListenedAlbums = getListenedAlbumsPercentage(
    totalAlbumsCount,
    listenedAlbumsCount,
  );

  const value: AlbumsStatzContextType = useMemo(
    () => ({
      totalAlbumsCount,
      listenedAlbumsCount,
      percentageListenedAlbums,
      totalAlbumsDuration,
      listenedAlbumsDuration,
      backlogAlbumsCount,
    }),
    [
      totalAlbumsCount,
      listenedAlbumsCount,
      percentageListenedAlbums,
      totalAlbumsDuration,
      listenedAlbumsDuration,
      backlogAlbumsCount,
    ],
  );

  return <AlbumsStatzContext value={value}>{children}</AlbumsStatzContext>;
};

type AlbumsStatzProviderProps = PropsWithChildren<{ albums: Album[] }>;
