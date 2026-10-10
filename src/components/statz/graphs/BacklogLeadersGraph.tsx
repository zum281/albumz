import { getBacklogLeadersQueryOptions } from "@/db/artists";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { HorizontalBarChart } from "./helpers/HorizontalBarChart";

export const BacklogLeadersGraph: FC = () => {
  const { data: backlogLeaders } = useSuspenseQuery(
    getBacklogLeadersQueryOptions(),
  );
  const labels = backlogLeaders.map((leader) => leader.artist);
  const counts = backlogLeaders.map((leader) => leader.count);

  return (
    <HorizontalBarChart
      labels={labels}
      dataset={counts}
      barColor="--chart-3"
      formatter={Math.round}
    />
  );
};
