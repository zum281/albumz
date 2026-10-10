import { cn } from "@/lib/utils";
import { cssvar } from "@/utils/graphs";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart: FC<DoughnutChartProps> = ({
  datasets,
  barColors,
  centerInfo,
  legend,
  legendFooter,
}) => {
  const data = useMemo(() => {
    return {
      datasets: [
        {
          data: datasets,
          backgroundColor: barColors.map(cssvar),
          borderWidth: 0,
        },
      ],
    };
  }, [datasets, barColors]);

  return (
    <div className="flex flex-wrap gap-6 items-center">
      <div className="relative w-36 mx-auto">
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
          {centerInfo}
        </div>
      </div>
      <div className="grid place-content-center text-sm gap-2 mx-auto">
        <ul className="grid gap-2">
          {legend.map(({ label, value, color }) => (
            <li key={label} className="flex items-center gap-[1ch]">
              <span aria-hidden className={cn("size-3", color)} />
              {label}
              <span>·</span>
              <span className="font-mono text-muted-foreground">{value}</span>
            </li>
          ))}
        </ul>
        {legendFooter}
      </div>
    </div>
  );
};

type DoughnutChartProps = {
  datasets: number[];
  barColors: string[];
  centerInfo: ReactNode;
  legend: { label: string; value: string; color: string }[];
  legendFooter?: ReactNode;
};
