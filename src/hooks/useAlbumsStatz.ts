import { AlbumsStatzContext } from "@/context/albums-statz/AlbumsStatzContext";
import { use } from "react";

export const useAlbumsStatz = () => {
  const context = use(AlbumsStatzContext);
  if (!context) {
    throw new Error("useAlbumsStatz must be used within a AlbumsStatzContext.");
  }

  return context;
};
