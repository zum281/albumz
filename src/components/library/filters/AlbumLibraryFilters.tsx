import type { FC } from "react";
import { AlbumLibraryListenedFilter } from "./AlbumLibraryListenedFilter";
import { AlbumLibrarySearch } from "./AlbumLibrarySearch";
import { AlbumLibraryYearFilter } from "./AlbumLibraryYearFilter";

export const AlbumLibraryFilters: FC = () => {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <AlbumLibrarySearch />
      <AlbumLibraryListenedFilter />
      <AlbumLibraryYearFilter />
    </div>
  );
};
