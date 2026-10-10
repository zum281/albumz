import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
} from "@/db/albums";
import { getPercentage } from "@/utils/math";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Count: FC = () => {
  const { data: existingAlbums } = useSuspenseQuery(albumsQueryOptions());
  const { data: listenedAlbumsCount } = useSuspenseQuery(
    listenedAlbumsCountQueryOptions(),
  );

  const totalAlbumsCount = existingAlbums.length;

  const listenedAlbumsPercentage = getPercentage(
    totalAlbumsCount,
    listenedAlbumsCount,
  );
  return `${listenedAlbumsPercentage.toFixed(1)}%`;
};
