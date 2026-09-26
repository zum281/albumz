import { RouteHeader } from "@/components/RouteHeader";
import { PlayProgress } from "@/components/statz/graphs/PlayProgress";
import { StatzOverview } from "@/components/statz/StatzOverview";
import { Spinner } from "@/components/ui/spinner";
import { AlbumsStatzProvider } from "@/context/albums-statz/AlbumsStatzProvider";
import { albumsQueryOptions } from "@/db/albums";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Statz: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery(albumsQueryOptions());

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <Spinner className="size-6" />;
  if (!albums) return <p>I really don't know what happened</p>;

  const totalAlbumsCount = albums.length;

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-7">
      <RouteHeader
        title="Statz"
        rightElement={<p>derived from {totalAlbumsCount} albums</p>}
      />
      <AlbumsStatzProvider albums={albums}>
        <StatzOverview />
        <div className="px-7 flex flex-wrap gap-3">
          <PlayProgress />
        </div>
      </AlbumsStatzProvider>
    </main>
  );
};
