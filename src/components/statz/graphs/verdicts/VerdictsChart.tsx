import { useAlbumsStatz } from "@/hooks/useAlbumsStatz";
import type { FC } from "react";
import { DoughnutChart } from "../helpers/DoughnutChart";

export const VerdictsChart: FC = () => {
  const {
    likedAlbumsCount,
    neutralAlbumsCount,
    dislikedAlbumsCount,
    likedAlbumsPercentage,
    neutralAlbumsPercentage,
    dislikedAlbumsPercentage,
    ratedAlbumsCount,
  } = useAlbumsStatz();

  const legend = [
    {
      label: "Liked",
      value: `${likedAlbumsPercentage.toFixed(1)}%`,
      color: "bg-chart-2",
    },
    {
      label: "Neutral",
      value: `${neutralAlbumsPercentage.toFixed(1)}%`,
      color: "bg-chart-3",
    },
    {
      label: "Disliked",
      value: `${dislikedAlbumsPercentage.toFixed(1)}%`,
      color: "bg-chart-4",
    },
  ];

  return (
    <DoughnutChart
      datasets={[likedAlbumsCount, neutralAlbumsCount, dislikedAlbumsCount]}
      barColors={["--chart-2", "--chart-3", "--chart-4"]}
      centerInfo={
        <span className="text-2xl font-bold">{ratedAlbumsCount}</span>
      }
      legend={legend}
    />
  );
};
