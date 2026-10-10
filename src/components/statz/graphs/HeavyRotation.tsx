import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { GraphCard } from "./GraphCard";
import { GraphError } from "./GraphError";
import { GraphSkeleton } from "./GraphSkeleton";
import { HeavyRotationGraph } from "./HeavyRotationGraph";

export const HeavyRotation: FC = () => {
  return (
    <GraphCard title="Heavy Rotation">
      <Boundaries
        getResetKey={() => "heavy-rotation-graph"}
        loader={<GraphSkeleton />}
        error={GraphError}
      >
        <HeavyRotationGraph />
      </Boundaries>
    </GraphCard>
  );
};
