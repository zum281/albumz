import { albumsQueryOptions } from "@/db/albums";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const RouteHeaderStatz: FC = () => {
  const { data: albums } = useSuspenseQuery(albumsQueryOptions());
  const totalAlbumsCount = albums.length;

  return <p>derived from {totalAlbumsCount} albums</p>;
};
