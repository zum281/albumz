import { AlbumLibrary } from "@/components/library/AlbumLibrary";
import { AlbumLibraryFilters } from "@/components/library/filters/AlbumLibraryFilters";
import { RouteHeader } from "@/components/RouteHeader";
import { AlbumLibraryFiltersProvider } from "@/context/album-library-filters/AlbumLibraryFiltersProvider";
import { AlbumsProvider } from "@/context/albums/AlbumsProvider";
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
      <RouteHeader
        title="Library"
        rightElement={<p>1 watched folder · {albums.length} albums</p>}
      />

      <AlbumsProvider albums={albums}>
        <AlbumLibraryFiltersProvider allAlbums={albums}>
          <div className="flex flex-col gap-4 px-7 pt-6 pb-10">
            <AlbumLibraryFilters />
            <AlbumLibrary />
          </div>
        </AlbumLibraryFiltersProvider>
      </AlbumsProvider>
    </main>
  );
};
