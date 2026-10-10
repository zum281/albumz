import { useAlbumsStatz } from "@/hooks/useAlbumsStatz";
import { secondsToHours } from "@/utils/time";
import { type FC } from "react";
import { DoughnutChart } from "../helpers/DoughnutChart";

export const PlayProgressChart: FC = () => {
  const {
    listenedAlbumsCount,
    backlogAlbumsCount,
    percentageListenedAlbums,
    listenedAlbumsDuration,
    totalAlbumsDuration,
  } = useAlbumsStatz();

  const legend = [
    {
      label: "Played",
      value: `${listenedAlbumsCount} albums`,
      color: "bg-chart-2",
    },
    {
      label: "Backlog",
      value: `${backlogAlbumsCount} albums`,
      color: "bg-chart-3",
    },
  ];

  return (
    <DoughnutChart
      datasets={[listenedAlbumsCount, backlogAlbumsCount]}
      barColors={["--chart-2", "--chart-3"]}
      centerInfo={
        <>
          <span className="text-2xl font-bold">
            {percentageListenedAlbums.toFixed(1)}%
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            PLAYED
          </span>
        </>
      }
      legend={legend}
      legendFooter={
        <p className="text-xs leading-normal text-muted-foreground">
          {secondsToHours(listenedAlbumsDuration)} hours of{" "}
          {secondsToHours(totalAlbumsDuration)} logged.
        </p>
      }
    />
  );
};
