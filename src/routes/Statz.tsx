import { RouteHeader } from "@/components/RouteHeader";
import { StatCard } from "@/components/statz/StatCard";
import { Spinner } from "@/components/ui/spinner";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
  listenedAlbumsDurationQueryOptions,
  totalAlbumsDurationQueryOptions,
  totalAlbumsTracksQueryOptions,
} from "@/db/albums";
import { getListenedAlbumsPercentage } from "@/utils/album";
import { secondsToHours } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Statz: FC = () => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
  } = useQuery(albumsQueryOptions());
  const { data: listenedAlbumsCount = 0 } = useQuery(
    listenedAlbumsCountQueryOptions(),
  );
  const { data: totalAlbumsTracks = 0 } = useQuery(
    totalAlbumsTracksQueryOptions(),
  );
  const { data: totalAlbumsDuration = 0 } = useQuery(
    totalAlbumsDurationQueryOptions(),
  );
  const { data: listenedAlbumsDuration = 0 } = useQuery(
    listenedAlbumsDurationQueryOptions(),
  );

  if (isError) return <pre>{String(error)}</pre>;
  if (isLoading) return <Spinner className="size-6" />;
  if (!albums) return <p>I really don't know what happened</p>;

  const totalAlbumsCount = albums.length;

  const listenedAlbumsPercentage = getListenedAlbumsPercentage(
    totalAlbumsCount,
    listenedAlbumsCount,
  );

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <RouteHeader
        title="Statz"
        rightElement={<p>derived from {totalAlbumsCount} albums</p>}
      />

      <div className="flex flex-wrap p-7 gap-3">
        <StatCard title="Albums" data={totalAlbumsCount} />
        <StatCard title="Tracks" data={totalAlbumsTracks} />
        <StatCard
          title="Runtime"
          data={`${secondsToHours(totalAlbumsDuration)}h`}
        />
        <StatCard
          title="Hours Played"
          data={`${secondsToHours(listenedAlbumsDuration)}h`}
          dataClassName="text-chart-2"
        />
        <StatCard
          title="Completion"
          data={`${listenedAlbumsPercentage.toFixed(1)}%`}
          dataClassName="text-chart-4"
        />
      </div>
    </main>
  );
};
