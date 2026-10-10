import { Progress } from "@/components/ui/progress";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
} from "@/db/albums";
import { getPercentage } from "@/utils/math";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const Count: FC = () => {
  const { data: existingAlbums } = useSuspenseQuery(albumsQueryOptions());
  const { data: listened } = useSuspenseQuery(
    listenedAlbumsCountQueryOptions(),
  );

  const total = existingAlbums.length;
  const percentage = getPercentage(total, listened);

  return (
    <div className="flex flex-col gap-2 px-2 pb-3 group-data-[collapsible=icon]:hidden">
      <div className="flex items-baseline justify-between gap-2 font-mono text-xs">
        <span className="tracking-widest text-muted-foreground uppercase">
          Listened
        </span>
        <span className="text-chart-2">
          {listened} / {total}
        </span>
      </div>
      <div className="h-1 bg-muted">
        <Progress value={percentage} />
      </div>
    </div>
  );
};
