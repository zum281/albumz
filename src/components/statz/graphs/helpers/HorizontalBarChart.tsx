import { cssvar } from "@/utils/graphs";
import type { FC } from "react";
import { Bar } from "react-chartjs-2";

export const HorizontalBarChart: FC<HorizontalBarChartProps> = ({
  labels,
  dataset,
  formatter,
  barColor,
}) => {
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
        data: dataset,
        backgroundColor: cssvar(barColor),
        datalabels: {
          display: true,
          anchor: "end" as const,
          align: "end" as const,
          color: cssvar("--muted-foreground"),
          formatter,
        },
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      <Bar options={options} className="w-full h-full mx-auto" data={data} />
    </div>
  );
};

type HorizontalBarChartProps = {
  labels: string[];
  dataset: number[];
  barColor: string;
  formatter?: (value: number) => string | number;
};
