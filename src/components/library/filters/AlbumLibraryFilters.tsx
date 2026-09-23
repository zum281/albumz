import type { Album } from "@/types/album";
import Fuse from "fuse.js";
import type { Dispatch, FC, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlbumLibraryListenedFilter } from "./AlbumLibraryListenedFilter";
import { AlbumLibrarySearch } from "./AlbumLibrarySearch";
import { AlbumLibraryYearFilter } from "./AlbumLibraryYearFilter";

export const AlbumLibraryFilters: FC<AlbumLibraryFiltersProps> = ({
  allAlbums,
  setFilteredAlbums,
}) => {
  const [query, setQuery] = useState<string>("");
  const [toggle, setToggle] = useState<"all" | "played" | "backlog">("all");

  const maxAlbumYear: number = useMemo(() => {
    return Math.max(...allAlbums.map((a) => a.year));
  }, [allAlbums]);

  const minAlbumYear: number = useMemo(() => {
    return Math.min(...allAlbums.map((a) => a.year));
  }, [allAlbums]);

  const [years, setYears] = useState<number[]>([minAlbumYear, maxAlbumYear]);

  const fuse = useMemo(() => {
    return new Fuse(allAlbums, {
      useTokenSearch: true,
      tokenMatch: "all",
      ignoreDiacritics: true,
      findAllMatches: true,
      minMatchCharLength: 2,
      ignoreFieldNorm: true,
      threshold: 0.25,
      keys: ["artist", "album"],
    });
  }, [allAlbums]);

  const handleSearch = useCallback(
    (albums: Album[], query: string) => {
      if (!query) return albums;
      return fuse.search(query).map((t) => t.item);
    },
    [fuse],
  );

  const handlePlayedBacklogToggle = useCallback(
    (albums: Album[], value: "all" | "played" | "backlog") => {
      if (value === "all") return albums;
      return albums.filter((a) => {
        if (value === "played") return a.listened;
        return !a.listened;
      });
    },
    [],
  );

  const handeYearFilter = useCallback((albums: Album[], years: number[]) => {
    const [min, max] = years;
    return albums.filter((a) => a.year >= min && a.year <= max);
  }, []);

  const handleFilters = useCallback(
    (query: string, toggle: "all" | "played" | "backlog", years: number[]) => {
      const filteredBySearch = handleSearch(allAlbums, query);
      const filteredByToggle = handlePlayedBacklogToggle(
        filteredBySearch,
        toggle,
      );
      const filteredByYear = handeYearFilter(filteredByToggle, years);

      setFilteredAlbums([...filteredByYear]);
    },
    [
      allAlbums,
      handleSearch,
      setFilteredAlbums,
      handlePlayedBacklogToggle,
      handeYearFilter,
    ],
  );

  useEffect(() => {
    handleFilters(query, toggle, years);
  }, [query, toggle, years, handleFilters]);

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

interface AlbumLibraryFiltersProps {
  allAlbums: Album[];
  setFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
}
