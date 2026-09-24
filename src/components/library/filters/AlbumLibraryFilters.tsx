import { useAlbumLibraryFilters } from "@/hooks/useAlbumLibraryFilters";
import type { Album } from "@/types/album";
import type { Dispatch, FC, SetStateAction } from "react";
import { AlbumLibraryListenedFilter } from "./AlbumLibraryListenedFilter";
import { AlbumLibrarySearch } from "./AlbumLibrarySearch";
import { AlbumLibraryYearFilter } from "./AlbumLibraryYearFilter";

export const AlbumLibraryFilters: FC<AlbumLibraryFiltersProps> = ({
  allAlbums,
  setFilteredAlbums,
}) => {
  const { setQuery, setToggle, setYears, years, minAlbumYear, maxAlbumYear } =
    useAlbumLibraryFilters(allAlbums, setFilteredAlbums);

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <AlbumLibrarySearch setQuery={setQuery} />
      <AlbumLibraryListenedFilter setListened={setToggle} />
      <AlbumLibraryYearFilter
        years={years}
        setYears={setYears}
        minYear={minAlbumYear}
        maxYear={maxAlbumYear}
      />
    </div>
  );
};

type AlbumLibraryFiltersProps = {
  allAlbums: Album[];
  setFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
};
