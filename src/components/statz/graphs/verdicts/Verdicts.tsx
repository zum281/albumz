import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { VerdictsChart } from "./VerdictsChart";

export const Verdicts: FC = () => {
  return (
    <GraphCard title="Verdicts">
      <VerdictsChart />
    </GraphCard>
  );
};
