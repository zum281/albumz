import { AlbumLibrary } from "@/components/library/AlbumLibrary";
import { albumsQueryOptions } from "@/db/albums";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Home: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery(albumsQueryOptions());

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <p>Loading…</p>;
  if (!albums) return <p>I really don't know what happened</p>;

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="flex items-center justify-between px-7 pt-6">
        <h1 className="font-display text-2xl font-medium tracking-(--track-display)">
          Albumz
        </h1>
      </header>

      <div className="flex flex-col gap-4 px-7 pt-6 pb-10">
        <AlbumLibrary albums={albums} />
      </div>
    </main>
  );
};
