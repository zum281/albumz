import { AlbumLibrary } from "@/components/library/AlbumLibrary";
import { AlbumLibraryFilters } from "@/components/library/filters/AlbumLibraryFilters";
import { RouteHeader } from "@/components/RouteHeader";
import { albumsQueryOptions } from "@/db/albums";
import type { Album } from "@/types/album";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";

export const Home: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery(albumsQueryOptions());

  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(albums ?? []);

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <p>Loading…</p>;
  if (!albums) return <p>I really don't know what happened</p>;

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <RouteHeader
        title="Library"
        rightElement={<p>1 watched folder · {albums.length} albums</p>}
      />

      <div className="flex flex-col gap-4 px-7 pt-6 pb-10">
        <AlbumLibraryFilters
          allAlbums={albums}
          setFilteredAlbums={setFilteredAlbums}
        />
        <AlbumLibrary albums={filteredAlbums} />
      </div>
    </main>
  );
};
