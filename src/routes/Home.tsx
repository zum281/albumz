import { Boundaries } from "@/components/Boundaries";
import { ErrorLargeWithRetry } from "@/components/errors/ErrorLargeWithRetry";
import { AlbumLibrary } from "@/components/library/AlbumLibrary";
import { AlbumLibrarySkeleton } from "@/components/library/AlbumLibrarySkeleton";
import { AlbumLibraryFilters } from "@/components/library/filters/AlbumLibraryFilters";
import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderHome } from "@/components/route-header/RouteHeaderHome";
import { Shelf } from "@/components/shelf/Shelf";
import { AlbumLibraryFiltersProvider } from "@/context/album-library-filters/AlbumLibraryFiltersProvider";
import { AlbumsProvider } from "@/context/albums/AlbumsProvider";
import type { FC } from "react";

export const Home: FC = () => {
  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Library" rightElement={<RouteHeaderHome />} />

      <Boundaries
        getResetKey={() => "home-albums-provider"}
        error={ErrorLargeWithRetry}
        loader={<AlbumLibrarySkeleton />}
      >
        <AlbumsProvider>
          <AlbumLibraryFiltersProvider>
            <div className="flex flex-col gap-4 px-7 pt-6 pb-10">
              <Shelf />
              <AlbumLibraryFilters />
              <AlbumLibrary />
            </div>
          </AlbumLibraryFiltersProvider>
        </AlbumsProvider>
      </Boundaries>
    </main>
  );
};
