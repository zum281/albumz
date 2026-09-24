import { AlbumLibraryFiltersContext } from "@/context/album-library-filters/AlbumLibraryFiltersContext";
import { use } from "react";

export const useAlbumLibraryFilters = () => {
  const context = use(AlbumLibraryFiltersContext);
  if (!context) {
    throw new Error(
      "useAlbumLibraryFilters must be used within a AlbumLibraryFiltersContext.",
    );
  }

  return context;
};
