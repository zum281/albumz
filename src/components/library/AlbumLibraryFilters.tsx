import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  const handleFilters = useCallback(
    (query: string, toggle: "all" | "played" | "backlog") => {
      const filteredBySearch = handleSearch(allAlbums, query);
      const filteredByToggle = handlePlayedBacklogToggle(
        filteredBySearch,
        toggle,
      );

      setFilteredAlbums([...filteredByToggle]);
    },
    [allAlbums, handleSearch, setFilteredAlbums, handlePlayedBacklogToggle],
  );

  useEffect(() => {
    handleFilters(query, toggle);
  }, [query, toggle, handleFilters]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <InputGroup className="w-1/2">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          id="input-group-search"
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
    </div>
  );
};

interface AlbumLibraryFiltersProps {
  allAlbums: Album[];
  setFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
}
