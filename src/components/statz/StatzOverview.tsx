import { totalAlbumsTracksQueryOptions } from "@/db/albums";
import { useAlbumsStatz } from "@/hooks/useAlbumsStatz";
import { secondsToHours } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { StatCard } from "./StatCard";

export const StatzOverview: FC = () => {
  const {
    totalAlbumsCount,
    totalAlbumsDuration,
    listenedAlbumsDuration,
    percentageListenedAlbums,
  } = useAlbumsStatz();

  const { data: totalAlbumsTracks = 0 } = useQuery(
    totalAlbumsTracksQueryOptions(),
  );

  return (
    <div className="flex flex-wrap px-7 gap-3">
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
        data={`${percentageListenedAlbums.toFixed(1)}%`}
        dataClassName="text-chart-4"
      />
    </div>
  );
};
