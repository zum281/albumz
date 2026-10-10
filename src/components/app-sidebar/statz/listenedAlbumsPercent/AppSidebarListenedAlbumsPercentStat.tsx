import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { Count } from "./Count";

export const AppSidebarListenedAlbumsPercentStat: FC = () => {
  return (
    <Boundaries getResetKey={() => "stat-percent"}>
      <Count />
    </Boundaries>
  );
};
