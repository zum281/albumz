import { cssvar } from "@/utils/graphs";
import type { FC } from "react";
import { Bar } from "react-chartjs-2";
import { GraphCard } from "./GraphCard";

const options = {
  barPercentage: 0.5,
  indexAxis: "y" as const,
  responsive: true,
  layout: { padding: { right: 40 } },
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { display: false }, stacked: true },
    y: { grid: { display: false }, stacked: true },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data_main = labels.map(() => Math.random() * 500 + 2);
const data = {
  labels,
  datasets: [
    {
      data: data_main,
      backgroundColor: cssvar("--chart-3"),
      datalabels: {
        display: true,
        anchor: "end" as const,
        align: "end" as const,
        color: "white",
        formatter: Math.round,
      },
    },
  ],
};
export const BacklogLeaders: FC = () => {
  return (
    <GraphCard title="Backlog Leaders">
      <div className="relative w-full h-full">
        <Bar options={options} className="w-full h-full mx-auto" data={data} />
      </div>
    </GraphCard>
  );
};
