import { AlbumLibrary } from "@/components/library/AlbumLibrary";
import { albumsQueryOptions } from "@/db/albums";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Home: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery(albumsQueryOptions());

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <p>Loading…</p>;
  if (!albums) return <p>I really don't know what happened</p>;

  return (
    <main>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 0 0.25rem",
          marginBottom: "0.25rem",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1.5rem",
            letterSpacing: "var(--track-display)",
          }}
        >
          Albumz
        </h1>
      </header>

      <AlbumLibrary albums={albums} />
    </main>
  );
};
