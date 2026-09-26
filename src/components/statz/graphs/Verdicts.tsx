import { useAlbumsStatz } from "@/hooks/useAlbumsStatz";
import { cssvar } from "@/utils/graphs";
import type { FC } from "react";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { GraphCard } from "./GraphCard";

export const Verdicts: FC = () => {
  const {
    likedAlbumsCount,
    neutralAlbumsCount,
    dislikedAlbumsCount,
    likedAlbumsPercentage,
    neutralAlbumsPercentage,
    dislikedAlbumsPercentage,
    ratedAlbumsCount,
  } = useAlbumsStatz();

  const data = useMemo(() => {
    return {
      datasets: [
        {
          // Liked, Neutral, Disliked
          data: [likedAlbumsCount, neutralAlbumsCount, dislikedAlbumsCount],
          backgroundColor: [
            cssvar("--chart-2"),
            cssvar("--chart-3"),
            cssvar("--chart-4"),
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [likedAlbumsCount, neutralAlbumsCount, dislikedAlbumsCount]);

  return (
    <GraphCard title="Verdicts">
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
            <span className="text-2xl font-bold">{ratedAlbumsCount}</span>
          </div>
        </div>
        <div className="grid place-content-center text-sm gap-2 mx-auto">
          <ul className="grid gap-2">
            <li className="flex items-center gap-[1ch]">
              <span aria-hidden className="size-3 bg-chart-2" />
              Liked<span>·</span>
              <span className="font-mono text-muted-foreground">
                {likedAlbumsPercentage.toFixed(1)}%
              </span>
            </li>
            <li className="flex items-center gap-[1ch]">
              <span aria-hidden className="size-3 bg-chart-3" />
              Neutral<span>·</span>
              <span className="font-mono text-muted-foreground">
                {neutralAlbumsPercentage.toFixed(1)}%
              </span>
            </li>
            <li className="flex items-center gap-[1ch]">
              <span aria-hidden className="size-3 bg-chart-4" />
              Disliked<span>·</span>
              <span className="font-mono text-muted-foreground">
                {dislikedAlbumsPercentage.toFixed(1)}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </GraphCard>
  );
};
