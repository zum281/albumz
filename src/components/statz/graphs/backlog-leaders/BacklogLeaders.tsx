import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { GraphCard } from "../helpers/GraphCard";
import { GraphError } from "../helpers/GraphError";
import { GraphSkeleton } from "../helpers/GraphSkeleton";
import { BacklogLeadersGraph } from "./BacklogLeadersGraph";

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
