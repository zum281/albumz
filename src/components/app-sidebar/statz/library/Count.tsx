import { albumsQueryOptions } from "@/db/albums";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Count: FC = () => {
  const { data } = useSuspenseQuery(albumsQueryOptions());
  return data.length;
};
