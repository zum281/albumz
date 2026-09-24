import type { Album } from "@/types/album";
import type { Dispatch, SetStateAction } from "react";

export type AlbumsContextType = {
  minAlbumYear: number;
  maxAlbumYear: number;
  filteredAlbums: Album[];
  updateFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
};
