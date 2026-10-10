import { getHeavyRotationQueryOptions } from "@/db/artists";
import { secondsToHours } from "@/utils/time";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { HorizontalBarChart } from "./helpers/HorizontalBarChart";

export const HeavyRotationGraph: FC = () => {
  const { data: backlogLeaders } = useSuspenseQuery(
    getHeavyRotationQueryOptions(),
  );
  const labels = backlogLeaders.map((leader) => leader.artist);
  const duration = backlogLeaders.map((leader) => leader.duration);

  return (
    <HorizontalBarChart
      labels={labels}
      dataset={duration}
      barColor="--chart-4"
      formatter={(value: number) => `${secondsToHours(value)}h`}
    />
  );
};
