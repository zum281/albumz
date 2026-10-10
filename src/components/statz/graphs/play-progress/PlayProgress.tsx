import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { PlayProgressChart } from "./PlayProgressChart";

export const PlayProgress: FC = () => {
  return (
    <GraphCard title="Play Progress">
      <PlayProgressChart />
    </GraphCard>
  );
};
