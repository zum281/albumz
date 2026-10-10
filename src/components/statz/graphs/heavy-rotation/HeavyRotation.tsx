import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { HeavyRotationChart } from "./HeavyRotationChart";

export const HeavyRotation: FC = () => {
  return (
    <GraphCard title="Heavy Rotation">
      <HeavyRotationChart />
    </GraphCard>
  );
};
