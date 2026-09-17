import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { AlbumLibrary } from "../components/library/AlbumLibrary";
import { ScanDialog } from "../components/scan/ScanDialog";
import { getAlbums } from "../db/albums";
import { albumToExisting } from "../utils/album";

export const Home: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <p>Loading…</p>;
  if (!albums) return <p>I really don't know what happened</p>;

  return (
    <main>
      <h1>Albumz</h1>

      <ScanDialog existingAlbums={albums.map(albumToExisting)} />
      <AlbumLibrary albums={albums} />
    </main>
  );
};
