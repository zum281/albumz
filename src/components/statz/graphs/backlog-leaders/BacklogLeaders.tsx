import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { BacklogLeadersChart } from "./BacklogLeadersChart";

export const BacklogLeaders: FC = () => {
  return (
    <GraphCard title="Backlog Leaders">
      <BacklogLeadersChart />
    </GraphCard>
  );
};
