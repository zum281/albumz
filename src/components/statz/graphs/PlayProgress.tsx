import { useAlbumsStatz } from "@/hooks/useAlbumsStatz";
import { cssvar } from "@/utils/graphs";
import { secondsToHours } from "@/utils/time";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useMemo, type FC } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PlayProgress: FC = () => {
  const {
    listenedAlbumsCount,
    backlogAlbumsCount,
    percentageListenedAlbums,
    listenedAlbumsDuration,
    totalAlbumsDuration,
  } = useAlbumsStatz();

  const data = useMemo(() => {
    return {
      datasets: [
        {
          // Played, backlog
          data: [listenedAlbumsCount, backlogAlbumsCount],
          backgroundColor: [cssvar("--chart-2"), cssvar("--chart-3")],
          borderWidth: 0,
        },
      ],
    };
  }, [listenedAlbumsCount, backlogAlbumsCount]);

  return (
    <div className="flex flex-wrap flex-col gap-6 border border-border p-6 bg-card">
      <h2 className="uppercase text-2xl font-bold tracking-tight">
        Play Progress
      </h2>
      <div className="relative w-36">
        <Doughnut
          aria-hidden
          data={data}
          options={{
            cutout: "68%",
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">
            {percentageListenedAlbums.toFixed(1)}%
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            PLAYED
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <ul className="flex flex-col gap-2.5">
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 bg-chart-2" />
            Played ·{" "}
            <span className="font-mono text-muted-foreground">
              {listenedAlbumsCount} albums
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 bg-chart-3" />
            Backlog ·{" "}
            <span className="font-mono text-muted-foreground">
              {backlogAlbumsCount} albums
            </span>
          </li>
        </ul>
        <p className="text-xs leading-normal text-muted-foreground">
          {secondsToHours(listenedAlbumsDuration)} hours of{" "}
          {secondsToHours(totalAlbumsDuration)} logged.
        </p>
      </div>
    </div>
  );
};
