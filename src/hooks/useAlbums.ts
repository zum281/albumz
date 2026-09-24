import { AlbumsContext } from "@/context/albums/AlbumsContext";
import { use } from "react";

export const useAlbums = () => {
  const context = use(AlbumsContext);
  if (!context) {
    throw new Error("useAlbums must be used within a AlbumsContext.");
  }

  return context;
};
