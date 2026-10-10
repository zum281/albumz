import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { FC, PropsWithChildren } from "react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.set("plugins.datalabels", { display: false });
export const GraphCard: FC<GraphCardProps> = ({ title, children }) => {
  return (
    <div className="grid place-items-center gap-7 border border-border p-6 bg-card flex-1">
      <h2 className="uppercase text-2xl font-bold tracking-tight text-center self-start">
        {title}
      </h2>
      {children}
    </div>
  );
};

type GraphCardProps = PropsWithChildren<{ title: string }>;
