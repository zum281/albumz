import { createContext } from "react";
import type { AlbumsContextType } from "./AlbumsContext.types";

export const AlbumsContext = createContext<AlbumsContextType | null>(null);
