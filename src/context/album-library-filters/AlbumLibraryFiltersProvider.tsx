import { useAlbums } from "@/hooks/useAlbums";
import type { Album } from "@/types/album";
import { AlbumListenedToggle } from "@/types/enums";
import Fuse from "fuse.js";
import type { FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlbumLibraryFiltersContext } from "./AlbumLibraryFiltersContext";
import type { AlbumLibraryFiltersContextType } from "./AlbumLibraryFiltersContext.types";

export const AlbumLibraryFiltersProvider: FC<
  AlbumLibraryFiltersProviderProps
> = ({ allAlbums, children }) => {
  const { minAlbumYear, maxAlbumYear, updateFilteredAlbums } = useAlbums();
  const [query, setQuery] = useState<string>("");
  const [toggle, setToggle] = useState<AlbumListenedToggle>(
    AlbumListenedToggle.ALL,
  );
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

      updateFilteredAlbums([...filteredByYear]);
    },
    [
      allAlbums,
      handleSearch,
      updateFilteredAlbums,
      handlePlayedBacklogToggle,
      handeYearFilter,
    ],
  );

  useEffect(() => {
    handleFilters(query, toggle, years);
  }, [query, toggle, years, handleFilters]);

  const value: AlbumLibraryFiltersContextType = useMemo(
    () => ({
      query,
      listenedToggle: toggle,
      years,
      updateQuery: setQuery,
      updateListenedToggle: setToggle,
      updateYears: setYears,
    }),
    [query, toggle, years],
  );

  return (
    <AlbumLibraryFiltersContext value={value}>
      {children}
    </AlbumLibraryFiltersContext>
  );
};

type AlbumLibraryFiltersProviderProps = PropsWithChildren<{
  allAlbums: Album[];
}>;
