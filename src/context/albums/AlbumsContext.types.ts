import type { Album } from "@/types/album";
import type { Dispatch, SetStateAction } from "react";

export type AlbumsContextType = {
  albums: Album[];
  minAlbumYear: number;
  maxAlbumYear: number;
  filteredAlbums: Album[];
  updateFilteredAlbums: Dispatch<SetStateAction<Album[]>>;
};
