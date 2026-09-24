import { createContext } from "react";
import type { AlbumLibraryFiltersContextType } from "./AlbumLibraryFiltersContext.types";

export const AlbumLibraryFiltersContext =
  createContext<AlbumLibraryFiltersContextType | null>(null);
