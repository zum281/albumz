import {
  dislikedAlbumsCountQueryOptions,
  likedAlbumsCountQueryOptions,
  listenedAlbumsCountQueryOptions,
  listenedAlbumsDurationQueryOptions,
  neutralAlbumsCountQueryOptions,
  ratedAlbumsCountQueryOptions,
  totalAlbumsDurationQueryOptions,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { getPercentage } from "@/utils/math";
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

  const { data: ratedAlbumsCount = 0 } = useQuery(
    ratedAlbumsCountQueryOptions(),
  );

  const { data: likedAlbumsCount = 0 } = useQuery(
    likedAlbumsCountQueryOptions(),
  );
  const { data: neutralAlbumsCount = 0 } = useQuery(
    neutralAlbumsCountQueryOptions(),
  );
  const { data: dislikedAlbumsCount = 0 } = useQuery(
    dislikedAlbumsCountQueryOptions(),
  );

  const totalAlbumsCount = albums.length;
  const backlogAlbumsCount = totalAlbumsCount - listenedAlbumsCount;

  const percentageListenedAlbums = getPercentage(
    totalAlbumsCount,
    listenedAlbumsCount,
  );

  const likedAlbumsPercentage = getPercentage(
    ratedAlbumsCount,
    likedAlbumsCount,
  );
  const neutralAlbumsPercentage = getPercentage(
    ratedAlbumsCount,
    neutralAlbumsCount,
  );
  const dislikedAlbumsPercentage = getPercentage(
    ratedAlbumsCount,
    dislikedAlbumsCount,
  );

  const value: AlbumsStatzContextType = useMemo(
    () => ({
      totalAlbumsCount,
      listenedAlbumsCount,
      percentageListenedAlbums,
      totalAlbumsDuration,
      listenedAlbumsDuration,
      backlogAlbumsCount,
      ratedAlbumsCount,
      likedAlbumsCount,
      neutralAlbumsCount,
      dislikedAlbumsCount,
      likedAlbumsPercentage,
      neutralAlbumsPercentage,
      dislikedAlbumsPercentage,
    }),
    [
      totalAlbumsCount,
      listenedAlbumsCount,
      percentageListenedAlbums,
      totalAlbumsDuration,
      listenedAlbumsDuration,
      backlogAlbumsCount,
      ratedAlbumsCount,
      likedAlbumsCount,
      neutralAlbumsCount,
      dislikedAlbumsCount,
      likedAlbumsPercentage,
      neutralAlbumsPercentage,
      dislikedAlbumsPercentage,
    ],
  );

  return <AlbumsStatzContext value={value}>{children}</AlbumsStatzContext>;
};

type AlbumsStatzProviderProps = PropsWithChildren<{ albums: Album[] }>;
