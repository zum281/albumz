import { albumsQueryOptions } from "@/db/albums";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const RouteHeaderHome: FC = () => {
  const { data: albums } = useSuspenseQuery(albumsQueryOptions());

  return <p>1 watched folder · {albums.length} albums</p>;
};
