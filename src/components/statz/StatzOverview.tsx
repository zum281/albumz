import type { FC } from "react";
import { Boundaries } from "../Boundaries";
import { ErrorSmall } from "../errors/ErrorSmall";
import { StatzOverviewContent } from "./StatzOverviewContent";

export const StatzOverview: FC = () => {
  return (
    <Boundaries getResetKey={() => "statz-overview"} error={ErrorSmall}>
      <StatzOverviewContent />
    </Boundaries>
  );
};
