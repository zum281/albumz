import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import type { Album } from "@/types/album";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
      <InputGroup className="h-auto w-auto grow basis-55">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          id="input-group-search"
          className="h-auto self-stretch"
          placeholder="Search album or artist..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </InputGroup>
      <RadioGroup
        variant="segmented"
        aria-label="Listened status"
        defaultValue="all"
        onValueChange={(value: "all" | "played" | "backlog") => {
          setToggle(value);
        }}
      >
        <RadioGroupItem variant="segmented" value="all">
          All
        </RadioGroupItem>
        <RadioGroupItem variant="segmented" value="played">
          Played
        </RadioGroupItem>
        <RadioGroupItem variant="segmented" value="backlog">
          Backlog
        </RadioGroupItem>
      </RadioGroup>
      <div className="flex grow basis-64 items-center gap-2 border border-border bg-card px-3 py-2.25 font-mono text-xs tabular-nums">
        <span className="tracking-widest text-muted-foreground uppercase">
          Years
        </span>
        <span>{years[0]}</span>
        <div className="shrink-0 grow basis-21">
          <Slider
            defaultValue={[minAlbumYear, maxAlbumYear]}
            min={minAlbumYear}
            max={maxAlbumYear}
            step={1}
            onValueChange={(value) => {
              setYears([...(value as number[])]);
            }}
          />
        </div>
        <span>{years[1]}</span>
      </div>
    </div>
  );
};

interface AlbumLibraryFiltersProps {
  allAlbums: Album[];
  setFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
}
