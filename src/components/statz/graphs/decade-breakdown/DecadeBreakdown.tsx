import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { DecadeBreakdownChart } from "./DecadeBreakdownChart";

export const DecadeBreakdown: FC = () => {
  return (
    <GraphCard title="Decade Breakdown">
      <DecadeBreakdownChart />
    </GraphCard>
  );
};
