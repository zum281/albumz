import { Input } from "@/components/ui/input";
import type { Album } from "@/types/album";
import Fuse from "fuse.js";
import type { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";

export const AlbumLibraryFilters: FC<AlbumLibraryFiltersProps> = ({
  allAlbums,
  setFilteredAlbums,
}) => {
  const fuse = new Fuse(allAlbums, {
    useTokenSearch: true,
    tokenMatch: "all",
    ignoreDiacritics: true,
    findAllMatches: true,
    minMatchCharLength: 2,
    ignoreFieldNorm: true,
    threshold: 0.25,
    keys: ["artist", "album"],
  });

  const filterAlbums: ChangeEventHandler<HTMLInputElement> = (e) => {
    const query = e.target.value;
    if (!query) setFilteredAlbums([...allAlbums]);

    const filteredAlbums: Album[] = fuse.search(query).map((t) => t.item);

    setFilteredAlbums([...filteredAlbums]);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input placeholder="Search album or artist..." onChange={filterAlbums} />
    </div>
  );
};

interface AlbumLibraryFiltersProps {
  allAlbums: Album[];
  setFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
}
