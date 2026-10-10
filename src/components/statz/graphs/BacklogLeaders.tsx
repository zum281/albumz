import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { BacklogLeadersGraph } from "./BacklogLeadersGraph";
import { GraphCard } from "./GraphCard";
import { GraphError } from "./GraphError";
import { GraphSkeleton } from "./GraphSkeleton";

export const BacklogLeaders: FC = () => {
  return (
    <GraphCard title="Backlog Leaders">
      <Boundaries
        getResetKey={() => "backlog-leaders-graph"}
        loader={<GraphSkeleton />}
        error={GraphError}
      >
        <BacklogLeadersGraph />
      </Boundaries>
    </GraphCard>
  );
};
