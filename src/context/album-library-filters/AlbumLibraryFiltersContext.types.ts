import type { AlbumListenedToggle } from "@/types/enums";
import type { Dispatch, SetStateAction } from "react";

export type AlbumLibraryFiltersContextType = {
  query: string;
  updateQuery: Dispatch<SetStateAction<string>>;
  listenedToggle: AlbumListenedToggle;
  updateListenedToggle: Dispatch<SetStateAction<AlbumListenedToggle>>;
  years: number[];
  updateYears: Dispatch<SetStateAction<number[]>>;
};
