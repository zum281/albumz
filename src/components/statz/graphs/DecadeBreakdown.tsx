import { getDecadesBreakdownQueryOptions } from "@/db/decades";
import { cssvar } from "@/utils/graphs";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { Bar } from "react-chartjs-2";
import { GraphCard } from "./helpers/GraphCard";

export const DecadeBreakdown: FC = () => {
  const { data: decades } = useSuspenseQuery(getDecadesBreakdownQueryOptions());

  const labels = decades.map((d) => `${d.decade}s`);
  const listened = decades.map((d) => d.listened);
  const backlog = decades.map((d) => d.backlog);

  const options = {
    responsive: true,
    aspectRatio: 4,
    plugins: { legend: { display: false } },
    layout: { padding: { top: 40 } },
    scales: {
      x: { grid: { display: false }, stacked: true },
      y: { grid: { display: false }, ticks: { display: false }, stacked: true },
    },
  };

  const data = {
    labels,
    datasets: [
      { data: listened, backgroundColor: cssvar("--chart-2") },
      {
        data: backlog,
        backgroundColor: cssvar("--chart-3"),
        datalabels: {
          display: true,
          anchor: "end" as const,
          align: "end" as const,
          color: cssvar("--muted-foreground"),
        },
      },
    ],
  };
  return (
    <GraphCard title="Decade Breakdown">
      <div className="relative w-full h-full">
        <Bar options={options} className="w-full h-full mx-auto" data={data} />
      </div>
    </GraphCard>
  );
};
