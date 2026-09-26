import { createContext } from "react";
import type { AlbumsStatzContextType } from "./AlbumsStatzContext.types";

export const AlbumsStatzContext = createContext<AlbumsStatzContextType | null>(
  null,
);
