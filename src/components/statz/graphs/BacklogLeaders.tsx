import { getBacklogLeadersQueryOptions } from "@/db/artists";
import { cssvar } from "@/utils/graphs";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Bar } from "react-chartjs-2";
import { GraphCard } from "./GraphCard";

export const BacklogLeaders: FC = () => {
  const { data: backlogLeaders } = useQuery(getBacklogLeadersQueryOptions());
  const labels = backlogLeaders?.map((leader) => leader.artist);
  const counts = backlogLeaders?.map((leader) => leader.count);

  const options = {
    barPercentage: 0.5,
    indexAxis: "y" as const,
    responsive: true,
    layout: { padding: { right: 40 } },
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { display: false }, stacked: true },
      y: {
        grid: { display: false },
        stacked: true,
        ticks: { color: cssvar("--foreground") },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: cssvar("--chart-3"),
        datalabels: {
          display: true,
          anchor: "end" as const,
          align: "end" as const,
          color: cssvar("--muted-foreground"),
          formatter: Math.round,
        },
      },
    ],
  };

  return (
    <GraphCard title="Backlog Leaders">
      <div className="relative w-full h-full">
        <Bar options={options} className="w-full h-full mx-auto" data={data} />
      </div>
    </GraphCard>
  );
};
