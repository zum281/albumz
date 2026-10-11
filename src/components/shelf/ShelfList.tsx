import { getShelfAlbumsQueryOptions } from "@/db/albums";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { ShelfCard } from "./ShelfCard";

export const ShelfList: FC = () => {
  const { data: albums } = useSuspenseQuery(getShelfAlbumsQueryOptions());
  return (
    <div className="overflow-x-auto flex items-center gap-3 py-3">
      {albums.map((album) => (
        <ShelfCard key={album.id} album={album} />
      ))}
    </div>
  );
};
