import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { BacklogLeadersGraph } from "./BacklogLeadersGraph";
import { GraphCard } from "./GraphCard";

export const BacklogLeaders: FC = () => {
  return (
    <GraphCard title="Backlog Leaders">
      <Boundaries getResetKey={() => "backlog-leaders-graph"}>
        <BacklogLeadersGraph />
      </Boundaries>
    </GraphCard>
  );
};
